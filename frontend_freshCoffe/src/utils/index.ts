const formatoMoneda = (cantidad: number) => {
    return Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    }).format(cantidad);
};
export {
    formatoMoneda
}