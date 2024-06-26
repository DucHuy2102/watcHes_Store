import { useQuery } from '@tanstack/react-query';
import {
    Carousel,
    PolicyComponent,
    ShopNow,
    ReadMoreToBlogs,
    SayThanks,
    TheReviews,
} from '../../components/exportComponents';
import * as ProductService from '../../services/ProductService';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addAllProducts } from '../../redux/slides/productSlide';

const HomePage = () => {
    const dispatch = useDispatch();
    const products_Redux = useSelector((state) => state.product.products);
    const productLength = products_Redux.length;

    // scroll to top when render page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ----------------- Fetch data from API using react-query -----------------
    // Function to get all products from API
    const getProducts = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    // Fetch data from API using react-query
    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        enabled: productLength === 0,
    });

    // Add all products to redux store
    useEffect(() => {
        if (data?.data && productLength === 0) {
            dispatch(addAllProducts(data.data));
        }
    }, [data, dispatch, productLength]);

    return (
        <div>
            <Carousel />
            <PolicyComponent />
            <ShopNow />
            <ReadMoreToBlogs />
            <TheReviews />
            <SayThanks />
        </div>
    );
};

export default HomePage;
