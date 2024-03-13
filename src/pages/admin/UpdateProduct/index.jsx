import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select, InputNumber, Space, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'

import { ROUTES } from 'constants/routes'
import { getProductDetailRequest, createProductRequest } from '../../../redux/slicers/product.slice'
import { getCategoryListRequest } from '../../../redux/slicers/category.slice'
import { convertBase64ToImage, convertImageToBase64 } from 'utils/file'

import * as S from './styles'

const UpdateProductPage = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [updateForm] = Form.useForm()

  const { categoryList } = useSelector((state) => state.category)
  const { productDetail, updateProductData } = useSelector((state) => state.product)

  const initialValues = {
    name: productDetail.data.name,
    price: productDetail.data.price,
    categoryId: productDetail.data.category?.id,
    content: productDetail.data.content,
    images: [],
  }

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: id }))
    dispatch(getCategoryListRequest())
  }, [id])

  useEffect(() => {
    if (productDetail.data.id) {
      updateForm.resetFields()
      setImagesField(productDetail.data.images)
    }
  }, [productDetail.data])

  const setImagesField = async (images) => {
    const newImages = []

    for (let i = 0; i < images.length; i++) {
      const imageFile = await convertBase64ToImage(images[i].url, images[i].name, images[i].type)
      await newImages.push({
        id: images[i].id,
        lastModified: imageFile.lastModified,
        lastModifiedDate: imageFile.lastModifiedDate,
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type,
        thumbUrl: images[i].thumbUrl,
        originFileObj: imageFile,
      })
    }
    await updateForm.setFieldValue('images', newImages)
  }

  const handleUpdateProduct = async (values) => {
    const { images, ...productValues } = values
    const newImages = []
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj)
      await newImages.push({
        ...(images[i].id && { id: images[i].id }),
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      })
    }
    dispatch(
      createProductRequest({
        id: id,
        data: productValues,
        images: newImages,
        initialImageIds: productDetail.data.images.map((item) => item.id),
        callback: () => navigate(ROUTES.ADMIN.PRODUCT_MANAGEMENT),
      })
    )
  }

  const renderProductOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      )
    })
  }, [categoryList.data])

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h3>Update Product</h3>
        <Button type="primary" loading={updateProductData.load} onClick={() => updateForm.submit()}>
          Update
        </Button>
      </S.TopWrapper>
      <Form
        form={updateForm}
        layout="vertical"
        initialValues={initialValues}
        onFinish={(values) => handleUpdateProduct(values)}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Required!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'Required!' }]}
        >
          <Select>{renderProductOptions}</Select>
        </Form.Item>
        <Space>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Required!' }]}>
            <InputNumber
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: 200 }}
            />
          </Form.Item>
          <span>VND</span>
        </Space>
        <Form.Item
          label="Images"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e
            return e?.fileList
          }}
        >
          <Upload listType="picture-card" beforeUpload={Upload.LIST_IGNORE}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Content" name="content">
          <ReactQuill
            theme="snow"
            onChange={(value) => {
              updateForm.setFieldsValue({ content: value })
            }}
          />
        </Form.Item>
      </Form>
    </S.Wrapper>
  )
}

export default UpdateProductPage
