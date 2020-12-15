/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const path = require('path');
const { BundleComparisonPlugin } = require('@mixer/webpack-bundle-compare/dist/plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const { BannedModulesPlugin } = require('@fluidframework/bundle-size-tools')

module.exports = {
  entry: {
    'container': './src/container',
    'map': './src/map',
    'matrix': './src/matrix',
    'odspDriver': './src/odspDriver',
    'sharedString': './src/sharedString'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  node: false,
  plugins: [
    new BannedModulesPlugin({
        bannedModules: [{
                moduleName: 'assert',
                reason: 'This module is very large when bundled in browser facing Javascript, instead use the assert API in @fluidframework/common-utils'
            }
        ]
    }),
    new DuplicatePackageCheckerPlugin({
      // Also show module that is requiring each duplicate package
      verbose: true,
      // Emit errors instead of warnings
      emitError: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(process.cwd(), 'bundleAnalysis/report.html'),
      openAnalyzer: false,
      generateStatsFile: false,
      statsFilename: path.resolve(process.cwd(), 'bundleAnalysis/report.json')
    }),
    // Plugin that generates a compressed version of the stats file that can be uploaded to blob storage
    new BundleComparisonPlugin({
      // File to create, relative to the webpack build output path:
      file: path.resolve(process.cwd(), 'bundleAnalysis/bundleStats.msp.gz')
    })
  ],
};
