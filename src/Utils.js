export const isProductionEnv = () => {
    return !(process.env.WEBPACK_SERVE === "true");
}