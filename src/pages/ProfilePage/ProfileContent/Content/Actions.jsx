import { Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../../../hooks/useMutationHook';
import * as UserService from '../../../../services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

function Actions() {
    const userInfo_From_Redux = useSelector((state) => state.user);

    const mutation = useMutationHook(({ getToken, userInfo_From_Redux }) => {
        UserService.updateInfoUser(getToken, userInfo_From_Redux);
    });

    const getToken = localStorage.getItem('tokenUser');
    const handleUpdateUser = (e) => {
        e.preventDefault();
        mutation.mutate(
            { getToken, userInfo_From_Redux },
            {
                onSuccess: () => {
                    toast.success('Cập nhật thông tin thành công');
                },
                onError: () => {
                    toast.error('Cập nhật thông tin thất bại');
                },
            }
        );
    };
    return (
        <>
            <Box
                mt={5}
                py={5}
                px={0}
                display='flex'
                justifyContent='flex-end'
                borderTopWidth={1}
                borderColor='brand.light'
            >
                <Button onClick={handleUpdateUser}>Lưu thay đổi</Button>
            </Box>
        </>
    );
}

export default Actions;
