import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Select, InputNumber, Space, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'

import { ROUTES } from 'constants/routes'
import { EDITOR_FORMATS, EDITOR_MODULES } from 'constants/editor'
import { createProductRequest } from '../../../redux/slicers/product.slice'
import { getCategoryListRequest } from '../../../redux/slicers/category.slice'
import { convertImageToBase64 } from 'utils/file'

import * as S from './styles'

const CreateProductPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [createForm] = Form.useForm()

  const { categoryList } = useSelector((state) => state.category)
  const { createProductData } = useSelector((state) => state.product)

  const initialValues = {
    name: '',
    price: undefined,
    categoryId: undefined,
    content: '',
    images: [],
  }

  useEffect(() => {
    dispatch(getCategoryListRequest())
  }, [])

  const handleCreateProduct = async (values) => {
    const { images, ...productValues } = values
    const newImages = []
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj)
      await newImages.push({
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      })
    }
    dispatch(
      createProductRequest({
        data: productValues,
        images: newImages,
        callback: () => navigate(ROUTES.ADMIN.PRODUCT_LIST),
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
        <h3>Tạo sản phẩm</h3>
        <Button type="primary" loading={createProductData.load} onClick={() => createForm.submit()}>
          Tạo
        </Button>
      </S.TopWrapper>
      <Form
        form={createForm}
        layout="vertical"
        initialValues={initialValues}
        onFinish={(values) => handleCreateProduct(values)}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Required!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Thương hiệu"
          name="categoryId"
          rules={[{ required: true, message: 'Required!' }]}
        >
          <Select>{renderProductOptions}</Select>
        </Form.Item>
        <Space>
          <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Required!' }]}>
            <InputNumber
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: 200 }}
            />
          </Form.Item>
          <span>VND</span>
        </Space>
        <Form.Item
          label="Hình ảnh"
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
        <Form.Item label="Nội dung" name="content">
          <ReactQuill
            theme="snow"
            modules={EDITOR_MODULES}
            formats={EDITOR_FORMATS}
            onChange={(value) => {
              createForm.setFieldsValue({ content: value })
            }}
          />
        </Form.Item>
      </Form>
    </S.Wrapper>
  )
}

export default CreateProductPage
