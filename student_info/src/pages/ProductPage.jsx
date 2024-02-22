import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage(props) {

    const params = useParams();

    console.log(params.productId); // /product/:productId, productId는 params의 키값
    const productId = parseInt(params.productId); // params.productId 가 문자열이므로 int로 변환

    const products = useMemo(() => [
        {
            productId: 1,
            productName: "상품1",
        },

        {
            productId: 2,
            productName: "상품2",
        },

        {
            productId: 3,
            productName: "상품3",
        }
    ], []);

    const product = useMemo(() => products.filter(product => product.productId === productId/** params.productId */)[0], [params.productId]);

    return (
        <div>
            <h3>상품번호: { product?.productId }</h3>
            <h3>상품명: { product?.productName }</h3>
        </div>
    );
}

export default ProductPage;