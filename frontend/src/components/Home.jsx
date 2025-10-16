import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import './Home.css'


function Home(){
    const [fileData, setFileData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isloading, setLoading] = useState(false);


    const fetchData = useCallback( async ()=>{

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/report/all-data`);

            if(!response.ok){
                throw new Error('Failed to Fetch');
                
            }

            const result = await response.json();

            if(!result.success){
                throw new Error('Failed to Fetch');
                
            }

            setFileData(result.data);
            // console.log(result.data)
        }
        catch(error){
            toast.error(error.message)
        }
    },[])


    useEffect(()=>{
        fetchData()
    },[fetchData])

    function handleFileChange(e) {
        setSelectedFile(e.target.files[0]);
    }

    async function onFileSubmit(){
        try{    
                setLoading(true);
                if(!selectedFile){
                    alert("Please Select a file")
                    return;
                }
                // console.log(selectedFile);
                const formData = new FormData();
                formData.append('file', selectedFile);

                const response = await fetch(`${import.meta.env.VITE_API_URL}/upload/xml`, {
                    method:'POST',
                    body:formData
                }) 

                if(!response.ok){
                    throw new Error('Failed to Upload');
                   
                }
                const result = await response.json()

                if(!result.success){
                    throw new Error('Failed to Upload');
                    
                }

                // add the new submitted data to show the real time change on the UI without reloading the page
                setFileData(prev=> [...prev, result.data]);
                toast.success('Uploaded Successfully');
                
                // console.log(result);
        }
        catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false);
            setSelectedFile(null);
        }
    }

    async function handleDelete(id){

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/report/delete/${id}`, {
                method:'DELETE'
            })

            if(!response.ok){
                throw new Error('Failed to Delete');
                
            }
            const result = await response.json();

            if(!result.success){
                throw new Error('Failed to Delete');
               
            }

            // filter out the deleted data to show the real time change on the UI without reloading the page

            const filterData = fileData.filter((item)=> item._id !== id);

            setFileData(filterData);
            toast.success('Deleted Successfully');
            // console.log(result);
        }
        catch(error){
            toast.error(error.message);
        }
       
    }


    return(
        <div className="home-container">
            <div className="header">
                <h1>CreditSea Financial Portal</h1>
                <p>Secure XML Report Management System</p>
            </div>

            <div className="upload-section">
                <h2 className="upload-title">Upload Financial Report</h2>
                <div className="file-input-wrapper">
                    <input 
                        type='file' 
                        className="file-input"
                        placeholder='Upload the file' 
                        accept=".xml" 
                        onChange={handleFileChange}
                    />
                </div>
                <button className="upload-btn" onClick={onFileSubmit} disabled={isloading}>{isloading ? 'Uploading...' : 'Upload Report'}</button>
            </div>

            <div className="files-section">
                <h2 className="files-title">Financial Reports</h2>
                
                {fileData?.length > 0 ? (
                    <div className="files-grid">
                        {fileData.map((item) => (
                            <div key={item._id} className="file-card">
                                <div className="card-header">
                                    <Link to={`/detail-file/${item._id}`} className="details-link">
                                        View Details
                                    </Link>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(item._id)}
                                    >
                                      Delete
                                    </button>
                                </div>
                                <div className="card-info">
                                    <div className="info-item">
                                        <span className="info-label">Name:</span>
                                        <span className="info-value">{item.basicDetails.name}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">PAN:</span>
                                        <span className="info-value">{item.basicDetails.pan}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-files">
                        <p>No financial reports uploaded yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}   

export default Home