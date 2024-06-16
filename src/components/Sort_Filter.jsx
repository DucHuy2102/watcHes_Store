import { useEffect, useRef, useState } from 'react';
import {
    faChevronDown,
    faEye,
    faFilter,
    faPerson,
    faPersonDress,
    faSort,
    faSortAmountDownAlt,
    faSortAmountUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useMutationHook } from '../hooks/useMutationHook';
import * as ProductService from '../services/ProductService';
import { updateSearch } from '../redux/slides/productSlide';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

const Sort_Filter = () => {
    const dispatch = useDispatch();

    // Lấy dữ liệu sản phẩm từ Redux
    const productsRedux = useSelector((state) => state.product.products);
    const searchRedux = useSelector((state) => state.product.search);
    const numberProduct = searchRedux?.length;

    // filter
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Bộ lọc');

    // sort
    const [isOpenSort, setIsOpenSort] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Sắp xếp theo');

    // Hook xử lý tìm kiếm sản phẩm theo tên
    const mutationFindProduct = useMutationHook((name) => ProductService.findProductByName(name));

    // Xử lý mở / đóng menu lọc
    const toggleMenuFilter = () => {
        if (isOpenFilter) {
            if (selectedFilter === 'Bộ lọc') {
                setSelectedFilter('Bộ lọc');
            }
        }
        setIsOpenFilter(!isOpenFilter);
    };

    // Xử lý lựa chọn một tùy chọn lọc
    const handleFilterClick = (filter) => {
        const filterName = filter === 'Đồng hồ nam' ? 'Nam' : 'Nữ';
        setSelectedFilter(filter);
        setIsOpenSort(false);
        const filterGenderProduct = productsRedux.filter(
            (product) => product.genderUser === filterName
        );
        if (filterGenderProduct.length > 0) {
            dispatch(updateSearch(filterGenderProduct));
            setIsOpenFilter(false);
        }
    };

    // Xử lý lựa chọn một tùy chọn
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpenFilter(false);
        // Thêm xử lý logic sắp xếp sản phẩm ở đây
    };

    // Hook xử lý tìm kiếm sản phẩm theo tên sản phẩm và loại sản phẩm
    const filterRef = useRef(null);
    const sortRef = useRef(null);

    // Xử lý click ngoài menu lọc và menu sắp xếp
    useEffect(() => {
        const handleClickOutsideFilter = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsOpenFilter(false);
            }
        };
        const handleClickOutsideSort = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setIsOpenSort(false);
            }
        };
        document.addEventListener('click', handleClickOutsideFilter);
        document.addEventListener('click', handleClickOutsideSort);
        return () => {
            document.removeEventListener('click', handleClickOutsideFilter);
            document.removeEventListener('click', handleClickOutsideSort);
        };
    }, []);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const displaySearch = () => {
        if (searchRedux && searchRedux.length > 0) {
            return `Tìm được ${searchRedux.length} sản phẩm`;
        }
        return 'Tất cả sản phẩm';
    };

    return (
        <div className='mt-3 h-10 font-medium w-full px-10 grid grid-cols-3 items-center font-PlayfairDisplay'>
            {/* link to page */}
            <div className='w-[30vw]'>
                <Link to='/'>Trang chủ</Link> / {displaySearch()}
                {/* {selectedFilter !== 'Bộ lọc'
                    ? `Lọc được ${numberProduct} sản phẩm`
                    : 'Tất cả sản phẩm'} */}
            </div>

            {/* name page */}
            <div className='w-full text-center'>
                <p className='font-bold text-xl'>
                    {selectedFilter === 'Bộ lọc' ? 'Tất cả sản phẩm' : selectedFilter}
                </p>
            </div>

            {/* sort and filter */}
            <div className='flex items-center justify-end gap-2'>
                {/* filter */}
                {/* <div className='relative mt-1' ref={filterRef}>
                    <button
                        className='border border-black flex justify-center items-center bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
                        onClick={toggleMenuFilter}
                    >
                        <span className='mr-2'>{selectedFilter}</span>
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                    {isOpenFilter && (
                        <div className='absolute border border-gray-300 right-0 mt-2 w-44 bg-white rounded shadow-lg z-10'>
                            <ul className='text-black'>
                                <li
                                    className='pl-7 flex items-center px-2 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleFilterClick('Đồng hồ nam')}
                                >
                                    <FontAwesomeIcon icon={faPerson} className='mr-2' />
                                    Đồng hồ nam
                                </li>
                                <li
                                    className='pl-7 flex items-center px-2 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleFilterClick('Đồng hồ nữ')}
                                >
                                    <FontAwesomeIcon icon={faPersonDress} className='mr-2' />
                                    Đồng hồ nữ
                                </li>
                            </ul>
                        </div>
                    )}
                </div> */}
                <Select
                    placeholder='Bộ lọc'
                    className='select-filter'
                    allowClear
                    onChange={handleChange}
                    options={[
                        {
                            value: 'Nam',
                            label: 'Đồng hồ nam',
                        },
                        {
                            value: 'Nữ',
                            label: 'Đồng hồ nữ',
                        },
                        // {
                        //     value: 'Yiminghe',
                        //     label: 'yiminghe',
                        // },
                        // {
                        //     value: 'disabled',
                        //     label: 'Disabled',
                        //     disabled: true,
                        // },
                    ]}
                />

                {/* sort */}
                {/* <div className='relative mt-1' ref={sortRef}>
                    <button
                        className='border border-black flex justify-center items-center bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
                        onClick={() => setIsOpenSort(!isOpenSort)}
                    >
                        <span className='mr-2'>{selectedOption}</span>
                        {isOpenSort ? (
                            <FontAwesomeIcon icon={faChevronDown} />
                        ) : (
                            <FontAwesomeIcon icon={faSort} />
                        )}
                    </button>

                    {isOpenSort && (
                        <div className='absolute border border-gray-300 right-0 mt-2 w-48 bg-white rounded shadow-lg z-10'>
                            <ul className='text-gray-800'>
                                <li
                                    className='flex items-center px-4 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleOptionClick('Được xem nhiều')}
                                >
                                    <FontAwesomeIcon icon={faEye} className='mr-2' />
                                    Được xem nhiều
                                </li>
                                <li
                                    className='flex items-center px-4 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleOptionClick('Giá cao tới thấp')}
                                >
                                    <FontAwesomeIcon icon={faSortAmountDownAlt} className='mr-2' />
                                    Giá cao tới thấp
                                </li>
                                <li
                                    className='flex items-center px-4 py-2 hover:bg-black hover:text-white cursor-pointer'
                                    onClick={() => handleOptionClick('Giá thấp tới cao')}
                                >
                                    <FontAwesomeIcon icon={faSortAmountUp} className='mr-2' />
                                    Giá thấp tới cao
                                </li>
                            </ul>
                        </div>
                    )}
                </div> */}
                <Select
                    placeholder='Sắp xếp'
                    className='select-sort'
                    allowClear
                    onChange={handleChange}
                    options={[
                        {
                            value: 'descrease',
                            label: 'Giá cao tới thấp',
                        },
                        {
                            value: 'increase',
                            label: 'Giá thấp tới cao',
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Sort_Filter;
