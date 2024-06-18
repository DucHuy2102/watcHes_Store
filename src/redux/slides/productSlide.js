import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: [],
    products: [],
    originalProducts: [],
    product: {
        id: '',
        productName: '',
        img: [],
        amount: 0,
        price: 0,
        brand: '',
        origin: '',
        thickness: '',
        size: '',
        wireMaterial: '',
        shellMaterial: '',
        style: '',
        feature: '',
        shape: '',
        condition: '',
        genderUser: '',
        description: '',
        color: '',
        weight: '',
        category: '',
        discount: 0,
        waterproof: 0,
    },
};

export const productSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.search = action.payload;
        },
        clearSearch: (state) => {
            state.search = [];
        },
        updateProduct: (state, action) => {
            state.product = { ...state.product, ...action.payload };
        },
        resetProduct: (state) => {
            state.product = { ...initialState.product };
        },
        addAllProducts: (state, action) => {
            state.products = action.payload;
            state.originalProducts = action.payload;
        },
        sortProducts: (state, action) => {
            const option = action.payload;
            if (option === undefined || option === 'undefined') {
                state.products = [...state.originalProducts];
            } else if (option === 'increase') {
                state.products = [...state.products].sort((a, b) => a.price - b.price);
            } else if (option === 'decrease') {
                state.products = [...state.products].sort((a, b) => b.price - a.price);
            } else if (option === 'A-Z') {
                state.products = [...state.products].sort((a, b) =>
                    a.productName.localeCompare(b.productName)
                );
            } else if (option === 'Z-A') {
                state.products = [...state.products].sort((a, b) =>
                    b.productName.localeCompare(a.productName)
                );
            }
        },
        filterProducts: (state, action) => {
            const filters = action.payload;
            state.products = state.originalProducts.filter((item) => {
                return filters.every((filter) => {
                    switch (filter.title) {
                        case 'Đối tượng':
                            return item.genderUser === filter.key;
                        case 'Chất liệu dây':
                            return item.wireMaterial === filter.key;
                        case 'Hình dáng mặt đồng hồ':
                            return item.shape === filter.key;
                        case 'Kháng nước':
                            return item.waterproof === filter.key;
                        default:
                            return true;
                    }
                });
            });
        },
    },
});

export const {
    updateSearch,
    clearSearch,
    sortProducts,
    updateProduct,
    resetProduct,
    addAllProducts,
    filterProducts,
} = productSlide.actions;

export default productSlide.reducer;
