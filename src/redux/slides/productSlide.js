import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: [],
    isFilter: false,
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
        genderUser: '',
        description: '',
        color: '',
        weight: '',
        category: '',
        discount: 0,
        waterproof: 0,
        condition: '',
    },
};

export const productSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // ----------------- SEARCH -----------------
        updateSearch: (state, action) => {
            state.search = action.payload;
        },

        clearSearch: (state) => {
            state.search = [];
        },

        // ----------------- PRODUCT -----------------
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

        resetAllProducts: (state) => {
            state.products = [];
            state.originalProducts = [];
        },

        // ----------------- FILTER & SORT -----------------
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
            let count = 0;
            if (filters.length === 0) {
                state.products = state.originalProducts;
                return;
            } else {
                state.products = state.originalProducts.filter((item) => {
                    return filters.every((filter) => {
                        switch (filter.title) {
                            case 'Đối tượng':
                                count++;
                                return item.genderUser === filter.key;
                            case 'Chất liệu dây':
                                count++;
                                return item.wireMaterial === filter.key;
                            case 'Hình dáng mặt đồng hồ':
                                count++;
                                return item.shape === filter.key;
                            case 'Kháng nước':
                                count++;
                                return item.waterproof === Number(filter.key);
                            default:
                                return true;
                        }
                    });
                });
            }
            if (count !== 0) {
                state.isFilter = true;
            }
        },

        clearFilter: (state) => {
            state.isFilter = false;
            state.products = state.originalProducts;
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
    clearFilter,
    resetAllProducts,
} = productSlide.actions;

export default productSlide.reducer;
