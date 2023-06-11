import React, { useEffect, useState } from 'react';
import instance from '../axios.config';
// components
import Title from '../components/createListing/Title';
import Description from '../components/createListing/Description';
import FileUpload from '../components/createListing/FileUpload';
import Carousel from '../components/createListing/Carousel';
import SelectCategory from '../components/createListing/SelectCategory';
import CreateMenu from '../components/createListing/CreateMenu';
import Contact from '../components/createListing/Contact';

//others
import categories from "../helper/category";

const CreateListing = () => {

    // useEffect(() => {
    //     const testData = {
    //         title: "test",
    //         description: "test description",
    //         displayImage: "test image",
    //         descriptionImage: "test description image",
    //         category: "test category",
    //         contact: "test contact",
    //         email: "test email",
    //         menu: [
    //             {
    //                 title: "testMenu",
    //                 image: "test image",
    //                 price: "test price",
    //             },
    //             {
    //                 title: "testMenu2",
    //                 image: "test image2",
    //                 price: "test priceEXPENSIVE",
    //             }
    //         ]
    //     }
    //     instance.post("/listing", testData)
    //         .then(res => {
    //             console.log(res);
    //         })
    // })
    const [listing, setListing] = useState({
        title: "",
        description: "",
        displayImage: "",
        descriptionImages: [],
        contact: "",
        contactMethod: "",
        email: "",
        category: "",
        menu: []
    });
    const [showMenu, setShowMenu] = useState(false);

    const getListing = () => {
        // instance.get("/listing")
        // .then(res => {
        //     console.log(res);
        // })
        // console.log(listing.descriptionImages)
        console.log(listing);
    }

    const handleTitle = (title) => {
        setListing((prev) => {
            return {
                ...prev, 
                ["title"]: title
            }
        })
    }
    const handleDescription = (desc) => {
        setListing((prev) => {
            return {
                ...prev, 
                ["description"]: desc
            }
        })
    }

    const handleTitleImage = (event) => {
        if (event.target.files && event.target.files.length > 0 ) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setListing((prev) => {
                    return {
                        ...prev,
                        ["displayImage"]: reader.result
                    }
                })
            }
        }
    }

    const handleDescImages = (event) => {
        if (event.target.files && event.target.files.length > 0 ) {
            console.log(event.target.files);
            for (let i = 0; i < event.target.files.length; i++) {
                const reader = new FileReader();
                // console.log(typeof event.target.files[index]);
                reader.readAsDataURL(event.target.files[i])
                reader.onload = () => {
                    setListing((prev) => {
                        return {
                            ...prev,
                            ["descriptionImages"]: [...prev.descriptionImages, reader.result]
                        }
                    })
                }
            }
        }
    }
    
    const handleCategory = (category) => {
        setListing((prev) => {
            console.log(category);
            return {
                ...prev, 
                ["category"]: category
            };
        })
    }

    const handleNumber = (num) => {
        setListing((prev) => {
            return {
                ...prev,
                ["contact"]: num
            };
        }) 
    }

    const handleMethod = (method) => {
        setListing((prev) => {
            return {
                ...prev,
                ["contactMethod"]: method
            };
        }) 
    }


    const handleEmail = (email) => {
        setListing((prev) => {
            return {
                ...prev,
                ["email"]: email
            };
        }) 
    }

    return <div>
        <div className="row justify-content-evenly mt-5">
            <div className="card col-5 p-3" >
                <h3>Create your listing here</h3>
                    <Title handleChange={handleTitle} value={listing.title}/>
                    <Description handleChange={handleDescription} value={listing.description}/>
                    <div className="row my-5">

                        <div className="col-4">

                            <FileUpload multiple={false} handleUpload={handleTitleImage} title={"Select your display picture"}/>
                        </div>
                        <div className="col-8">
                            <img src={listing.displayImage} alt="" height={250} width={"auto"}/>
                        </div>
                    </div>
                    
                    <SelectCategory handleCategory={handleCategory} categories={categories}></SelectCategory>
                
            </div>
            <div className="card p-3 col-5 mb-3">
                <FileUpload multiple={true} handleUpload={handleDescImages} title={"Select other photos to show users your product or service"}/>
                <Carousel images={listing.descriptionImages}></Carousel>
                <button onClick={() => setShowMenu(true)} type="button" className="mb-3 btn btn-primary">Create menu</button>
                <Contact listing={listing} handleNumber={handleNumber} handleMethod={handleMethod} handleEmail={handleEmail}/>
            </div>
        </div>
        <button onClick={getListing}>getListing</button>
        <CreateMenu 
            isOpen={showMenu}
            onRequestClose={() => setShowMenu(false)}
            setListing={setListing}
            setIsOpen={setShowMenu}
        />
    </div>
}

export default CreateListing;