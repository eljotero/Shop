import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart} from '../redux/slicers/cartSlicer';
import type { RootState } from '../redux/store';
import '../css/Cart.css';

function Cart () {

    const cart = useSelector((state: RootState) => state.cart.root);
    const dispatch = useDispatch();

    if (cart.length === 0) {
        return (
            <div></div>
        );
    }

    return (
        <div className="cartContainer">
            {cart.map((product) => (
                <div className="cartProduct" key={product.productId}>
                    <p>{product.productName}</p>
                    <p>{product.productPrice} PLN</p>
                    <p>{product.quantity}</p>
                    <button onClick={() => dispatch(removeFromCart(product.productId))}>X</button>
                </div>
            ))}
        </div>
    );

}

export default Cart;
