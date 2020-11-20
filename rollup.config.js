import babel from "@rollup/plugin-babel";
import buble from "@rollup/plugin-buble";
import { terser } from "rollup-plugin-terser";

const config = {
  input: "src/index.jsx",
  output: {
    format: "cjs",
    interop: false,
    strict: false,
    exports: "named"
  },
  plugins: [
    buble({ objectAssign: true }),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      plugins: ["@babel/plugin-transform-object-assign"]
    })
  ],
  external: ["react", "prop-types"]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      plugins: [
        [
          "transform-react-remove-prop-types",
          {
            removeImport: true,
            additionalLibraries: ["./hexColorPropType"]
          }
        ]
      ]
    }),
    terser({
      mangle: {
        properties: { regex: /^\$/ }
      },
      compress: {
        pure_getters: true
      }
    })
  );
}

export default config;
