import '../../styles/seller/add_product.css'
import placeholderImage from '../../assets/placeholderImages/productImagePlaceholder.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL, { CLOUDINARY_URL } from '../../API';
import { useNavigate } from 'react-router-dom';
import addLoading from '../../LoadingController.js'
import setLoading from '../../LoadingController.js';

function AddProducts({ setShowProfileCard, sellerData }) {

    const PRESET_NAME = "product_image_preset";

    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [newProduct, setNewProduct] = useState({

        productImage: '',
        productName: '',
        category: '',
        stock: 0,
        currentPrice: 0,
        userId: sellerData.userId,
        mrp: 0,
        status: 'Pending',
        discount: 7,
        description: '',
    });

    const inputChange = (e) => {
        let tag = e.target;
        let tagName = tag.name;
        let value = tag.value;
        setNewProduct({ ...newProduct, [tagName]: value });
        // console.log(tagName,value);
    }

    async function uploadImageToCloudinary() {
        let formData = new FormData();
        formData.append('file', image);
        formData.append("upload_preset", PRESET_NAME);
        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            let ImageUrl = response.data.secure_url;
            return ImageUrl;
        } catch (error) {
            console.log(error);
            return '';
        }
    }

    const saveProduct = (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log("new",newProduct);
        if (checkData()) {
            storeDataInDatabase();
            // setMyProducts([newProduct, ...myProducts]);
            // alert('Product Added Succesfully');
        } else {
            console.log("Fill all input");
            setLoading(false);
        }
        
    }

    async function storeDataInDatabase() {
        let imageUrl = await uploadImageToCloudinary();
        if (imageUrl) {
            try {
                let response = await axios.post(`${API_BASE_URL}/addProduct`, { ...newProduct, productImage: imageUrl });
                console.log("res", response);
                navigate("/myProducts");
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);

    }

    function checkData() {
        let values = Object.values(newProduct);
        // console.log(values);
        let empty = false;
        for (let data of values) {
            if (data == null || data == '' || data == undefined) {
                empty = false;
                break;
            }
            else {
                empty = true;
            }
        }
        return empty;
    }

    const triggerInputTag = (e) => {
        e.preventDefault();
        let tag = document.getElementById('imageInput');
        tag.click();
    }

    const fileChange = (event) => {
        let file = event.target.files[0];
        if (file) {
            console.log("File chosen successfully:", file.name);
            setImage(file);
            //Temprory Data
            let imageUrl = URL.createObjectURL(file);
            setNewProduct({ ...newProduct, productImage: imageUrl });
        }
    }

    return (
        <>
            <div className="addproductcontent">
                <div className="top">
                    <h2>Add / edit product</h2>
                    <div onClick={() => setShowProfileCard(true)}>
                        <i class="fa-solid fa-user" style={{ color: 'rgb(115, 51, 242)' }}></i>
                        <span>{sellerData.fullName}</span>
                    </div>
                </div>{/* Top */}

                <div className="content3">
                    <div className="leftcontent">
                        <form>
                            <label htmlFor="pname">Product name</label>
                            <input type="text" name='productName' onChange={inputChange} placeholder='Black Jeans' id='pname' />

                            <div className='divv'>
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <select name="category" onChange={inputChange} id="category" defaultValue=''>
                                        <option value="" disabled hidden>Select Category</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="mobiles">Mobiles</option>
                                        <option value="Food">Foods</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="stock">Stock</label>
                                    <input type="text" name='stock' onChange={inputChange} placeholder='9' id='stock' />
                                </div>
                            </div>
                            <div className='divv'>
                                <div>
                                    <label htmlFor="sprice">Selling price (₹)</label>
                                    <input type="text" name='currentPrice' onChange={inputChange} placeholder='899' id='sprice' />
                                </div>
                                <div>
                                    <label htmlFor="mrp">MRP (₹)</label>
                                    <input type="text" name='mrp' onChange={inputChange} placeholder='2,999' id='mrp' />
                                </div>
                            </div>

                            <label htmlFor="desc">Description</label>
                            <input type="text" name='description' onChange={inputChange} placeholder='Black jeans are available in M,XL,XXL' id='desc' />

                            <div>
                                <button onClick={saveProduct}>Save product</button>
                                <button>Cancel</button>
                            </div>

                        </form>
                    </div>{/* left content */}
                    <div className="rightcontent">
                        <span>Product images</span>
                        <img src={newProduct.productImage == '' ? placeholderImage : newProduct.productImage} alt="no" />
                        <input onChange={fileChange} type="file" name='imagebtn' id='imageInput' style={{ display: 'none' }} />
                        <button onClick={triggerInputTag}>Upload more images</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddProducts;