import Btn from "../Elements/Buttons";

const CardProduct = (props) => {
    const { children } = props;
    return (
        <div className="w-full max-w-xs bg-gray-800 border border-gray-700 rounded-lg shadow mx-3 flex flex-col justify-between mb-2">
            {children}
        </div>
    );
};

const Header = (props) => {
    const { image } = props;
    return (
        <a href="#">
            {/*  h-60 w-full object-cover == PROBLEM WOYYYY*/}
            <img src={image} alt="shoes" className="p-8 rounded-t-lg h-60 w-full object-cover" />
        </a>
    );
};

const Body = (props) => {
    const { name, children } = props;
    return (
        <div className="px-5 pb-5 h-full">
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-white pb-4">
                    {name.substring(0, 20)} ...
                </h5>
                <p className="text-m text-white">{children.substring(0, 100)}</p>
            </a>
        </div>
    );
};

const Footer = (props) => {
    const { harga, handleAddToCart, id } = props;
    return (
        <div className="flex items-center justify-between px-6 pb-6">
            <span className="text-xl font-bold text-white">
                Rp
                {harga.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                })}
            </span>
            <Btn className="bg-blue-600" onClick={() => handleAddToCart(id)}>
                Add To Chart
            </Btn>
        </div>
    );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
