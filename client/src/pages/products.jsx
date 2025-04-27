import { Fragment, useEffect, useState } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import Btn from "../components/elements/buttons";
import Counter from "../components/Fragments/Counter";
import { getProducts } from "../services/product.service";

// const products = [
//   {
//     id: 1,
//     name: 'Sepatu Lama',
//     price: 1000000,
//     image: '/images/shoes-1.jpg',
//     description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo perferendis sit.`,
//   },
//   {
//     id: 2,
//     name: 'Sepatu Baru',
//     price: 2000000,
//     image: '/images/shoes-2.jpg',
//     description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo perferendis sit.`,
//   },
//   {
//     id: 3,
//     name: 'Sepatu Hadiah',
//     price: 1500000,
//     image: '/images/shoes-2.jpg',
//     description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo perferendis sit.`,
//   },
// ];

const email = localStorage.getItem("email");

const ProductsPage = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        window.location.href = "/login";
    };

    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
        });
    }, []);

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            const total = cart.reduce((acc, cartItem) => {
                const product = products.find(
                    (product) => product.id === cartItem.id
                );
                const itemTotal = (product?.price || 0) * cartItem.qty;
                return acc + itemTotal;
            }, 0);
            setTotalPrice(total);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, products]);

    // useEffect(() => {
    //   console.log('Saving to localStorage:', cart);
    //   setCart(JSON.parse(localStorage.getItem("cart")) || [])
    // }, [])

    const handleAddToCart = (id) => {
        if (cart.find((item) => item.id === id)) {
            setCart(
                cart.map((item) =>
                    item.id === id ? { ...item, qty: item.qty + 1 } : item
                )
            );
        } else {
            setCart([...cart, { id, qty: 1 }]);
        }
    };

    return (
        <Fragment>
            <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
                {email}
                <Btn cls="ml-5 bg-black" onClick={handleLogout}>
                    Logout
                </Btn>
            </div>
            <div className="flex justify-center py-6">
                <div className="w-4/6 flex flex-wrap">
                    {products.length > 0 &&
                        products.map((product) => (
                            <CardProduct key={product.id}>
                                <CardProduct.Header image={product.image} />
                                <CardProduct.Body name={product.title}>
                                    {product.description}
                                </CardProduct.Body>
                                <CardProduct.Footer
                                    harga={product.price}
                                    id={product.id}
                                    handleAddToCart={handleAddToCart}
                                />
                            </CardProduct>
                        ))}
                </div>
                <div className="w-2/6">
                    <h1 className="text-3xl font-bold text-blue-600">Cart</h1>

                    <table className="text-left table-auto border-separate border-spacing-x-5">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 && cart.map((item) => {
                                const product = products.find(
                                    (product) => product.id === item.id
                                );
                                return (
                                    <tr key={item.id}>
                                        <td>{product.title}</td>
                                        <td>
                                            Rp{" "}
                                            {product.price.toLocaleString(
                                                "id-ID",
                                                {
                                                    styles: "currency",
                                                    currency: "IDR",
                                                }
                                            )}
                                        </td>
                                        <td>{item.qty}</td>
                                        <td>
                                            Rp{" "}
                                            {(
                                                item.qty * product.price
                                            ).toLocaleString("id-ID", {
                                                styles: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan={3}>
                                    <b>Total Price</b>
                                </td>
                                <td>
                                    <b>
                                        Rp{" "}
                                        {totalPrice.toLocaleString("id-ID", {
                                            styles: "currency",
                                            currency: "IDR",
                                        })}
                                    </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-5 flex justify-center mb-5">
                <Counter></Counter>
            </div>
        </Fragment>
    );
};

export default ProductsPage;
