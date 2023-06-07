import React, { Fragment, useEffect, useState } from 'react'
import AdminPageComponent from '../../../components/AdminPageComponent'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { ControlPoint } from '@mui/icons-material'
import { useStateContext } from '../../../contexts/ContextProvider'
import { DataGrid } from '@mui/x-data-grid';
import AxiosAdmin from '../../../components/AxiosAdmin'
import Loader from '../../../components/Loader'

const columns = [
    { field: 'id', headerName: 'Sr. No.', flex : 1, headerClassName : 'bg-gray-300 font-bold text-center' },
    { field: 'category_name', headerName: 'Category Name', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
    { field: 'sub_category_name', headerName: 'Sub-Category Name', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
    { field: 'status', headerName: 'Status', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
    { field: 'action', headerName: 'Actions', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
];

const SubCategoryList = () => {
    const { ADMINAPPNAME } = useStateContext()
    document.title = ADMINAPPNAME + 'Sub-Categories'
    const [categories, setCategories] = useState([])
    const [loader, setLoader] = useState(false)
    const getCategoryList = async() => {
        setLoader(true)
        await AxiosAdmin.get('/admin/sub_category_list')
        .then(({data})=>{
            setLoader(false)
            setCategories(data.data) 
        })
    }
    useEffect(()=>{ getCategoryList() },[])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <AdminPageComponent leftContent={'Sub-Category List'} rightContent={
                    <Link to={'/admin/subcategories/add-new-sub-category'}>
                        <Button variant='contained' size='small' className='tracking-wide' style={{ fontSize: '12px', padding: '5px 15px' }} startIcon={<ControlPoint />}>Add New Sub-Category</Button>
                    </Link>
                }>
                    <DataGrid
                        sx={{ textAlign : 'center' }}
                        rows={categories.map((item, index) => ({ id: index + 1, ...item }))}
                        columns={columns}
                        initialState={{
                            pagination: { paginationModel: { page: 0, pageSize: 8 }, },
                        }}
                        pageSizeOptions={[8, 16, 32, 64]}
                    />
                </AdminPageComponent>
            )}
        </Fragment>
    )
}

export default SubCategoryList