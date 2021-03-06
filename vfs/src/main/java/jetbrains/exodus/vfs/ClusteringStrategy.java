/**
 * Copyright 2010 - 2017 JetBrains s.r.o.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package jetbrains.exodus.vfs;

import jetbrains.exodus.env.Environment;
import jetbrains.exodus.env.Store;

/**
 * {@code ClusteringStrategy} as a part of {@linkplain VfsConfig} is specified on {@linkplain VirtualFileSystem}
 * creation. It defines the way the {@code VirtualFileSystem} splits contents of {@linkplain File files} on clusters.
 * Each cluster is a single key/value pair in a {@linkplain Store} of {@linkplain Environment} used to create the
 * {@linkplain VirtualFileSystem}. The greater file is the more clusters are required to save its contents.
 *
 * <p>{@linkplain #LINEAR} clustering strategy says the {@linkplain VirtualFileSystem} to create clusters of
 * the same size.
 *
 * <p>{@linkplain #QUADRATIC} clustering strategy says the {@linkplain VirtualFileSystem} to create new cluster greater
 * than the previous one on a specific constant. This strategy is default.
 *
 * <p>{@linkplain #EXPONENTIAL} clustering strategy says the {@linkplain VirtualFileSystem} to create new cluster
 * of size which is multiple of the size of the previous cluster.
 *
 * @see VirtualFileSystem
 * @see VfsConfig
 * @see VfsConfig#getClusteringStrategy()
 */
public abstract class ClusteringStrategy {

    public static final ClusteringStrategy LINEAR = new LinearClusteringStrategy();
    public static final ClusteringStrategy QUADRATIC = new QuadraticClusteringStrategy();
    public static final ClusteringStrategy EXPONENTIAL = new ExponentialClusteringStrategy();

    abstract int getFirstClusterSize();

    abstract int getNextClusterSize(final int prevClusterSize);

    abstract long getNextClusterNumber(final long clusterNumber);

    private int maxClusterSize = Integer.MAX_VALUE;

    public void setMaxClusterSize(final int maxClusterSize) {
        this.maxClusterSize = maxClusterSize;
    }

    protected int adjustClusterSize(final int nextClusterSize) {
        return nextClusterSize > maxClusterSize ? maxClusterSize : nextClusterSize;
    }

    @SuppressWarnings({"ProtectedField"})
    private abstract static class DefaultInitialClusteringStrategy extends ClusteringStrategy {

        private static final int DEFAULT_FIRST_CLUSTER_SIZE = 4096;
        private static final long DEFAULT_CLUSTER_NUMBER_DELTA = 1024;

        protected final int firstClusterSize;

        protected DefaultInitialClusteringStrategy() {
            this(DEFAULT_FIRST_CLUSTER_SIZE);
        }

        protected DefaultInitialClusteringStrategy(final int firstClusterSize) {
            this.firstClusterSize = firstClusterSize;
        }

        @Override
        int getFirstClusterSize() {
            return firstClusterSize;
        }

        @Override
        long getNextClusterNumber(final long clusterNumber) {
            return clusterNumber + DEFAULT_CLUSTER_NUMBER_DELTA;
        }
    }

    /**
     * Linear strategy: all clusters are of the same size.
     */
    public static class LinearClusteringStrategy extends DefaultInitialClusteringStrategy {

        public LinearClusteringStrategy() {
        }

        public LinearClusteringStrategy(final int firstClusterSize) {
            super(firstClusterSize);
        }

        @Override
        int getNextClusterSize(final int prevClusterSize) {
            return prevClusterSize;
        }
    }

    /**
     * Quadratic strategy: each cluster size is greater than size of previous one on a constant (first cluster size).
     */
    public static class QuadraticClusteringStrategy extends DefaultInitialClusteringStrategy {

        public QuadraticClusteringStrategy() {
        }

        public QuadraticClusteringStrategy(final int firstClusterSize) {
            super(firstClusterSize);
        }

        @Override
        int getNextClusterSize(final int prevClusterSize) {
            return adjustClusterSize(prevClusterSize + firstClusterSize);
        }
    }

    /**
     * Exponential strategy: each cluster size is multiple of size of previous one (phi times more).
     */
    public static class ExponentialClusteringStrategy extends DefaultInitialClusteringStrategy {

        public ExponentialClusteringStrategy() {
        }

        public ExponentialClusteringStrategy(final int firstClusterSize) {
            super(firstClusterSize);
        }

        @Override
        int getNextClusterSize(final int prevClusterSize) {
            return adjustClusterSize((prevClusterSize << 3) / 5);
        }
    }
}
