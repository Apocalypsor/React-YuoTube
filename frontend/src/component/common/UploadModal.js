import React, {useState} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, Divider, Snackbar} from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TextField from "@mui/material/TextField";
import theme from "../../theme";

const style = {
    uploadModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '87%',
        borderRadius: '12px',
        bgcolor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: 24,
        padding: '16px 32px 24px',
        overflow: 'auto',
    },
    uploadWrapper: {
        marginTop: "5%",
        marginBottom: "5%",
        textAlign: "center",
    },
    uploadMediaContainer: {
        marginTop: "1%",
        marginBottom: "1%",
    },
    uploadButtonWrapper: {
        marginTop: "4%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        padding: "12px 8px !important",
        width: "400px !important",
        height: "auto"
    },
}


function UploadModal() {
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [uploadedVideo, setUploadedVideo] = useState();
    const [uploadedCover, setUploadedCover] = useState();
    const [description, setDescription] = useState('')

    const clearState = () => {
        setUploadedVideo(null);
        setUploadedCover(null);
        setDescription('');
        setOpen(false);
    }

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const changeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleUploadClose = () => {
        if (!uploadedVideo) return;

        // let formData = new FormData();
        //
        // for (let img of uploaded) {
        //     formData.append("file", img.file);
        // }
        //
        // const upload = async () => {
        //     let posts = []
        //     for (let file of response.file) {
        //         posts.push({
        //             username: localStorage.getItem("CurrentUsername"),
        //             postType: file.type,
        //             postContent: file.url,
        //             description: description,
        //             public: privacy,
        //             tagging: tags
        //         })
        //     }
        //     await postPost(posts);
        // }
        //
        // upload().then(() => {
        //     setShowAlert(true)
        //     setTimeout(() => {
        //         setShowAlert(false)
        //     }, 3000)
        //
        //     window.location.reload()
        // });
    }

    const handleUploadVideo = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) {
            console.log("No video uploaded!");
        } else {
            setUploadedVideo({
                name: file.name,
                size: file.size,
                file: file,
                url: URL.createObjectURL(file)
            });
        }
    }

    const handleUploadCover = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) {
            console.log("No cover uploaded!");
        } else {
            setUploadedCover({
                name: file.name,
                size: file.size,
                file: file,
                url: URL.createObjectURL(file)
            });
        }
    }

    return (
        <>
            <Button
                variant="contained"
                component="label"
                color="secondary"
                onClick={handleClick}
            >
                Upload
            </Button>

            <Modal
                open={open}
                onClose={clearState}
                aria-labelledby="modal-new-post"
                aria-describedby="modal-new-post"
            >
                <Box sx={style.uploadModal}>
                    <Typography variant="h5" textAlign="center">
                        Upload Your Video
                    </Typography>
                    <Divider/>
                    {uploadedVideo ? (
                        <Container sx={style.uploadMediaContainer}>
                            <video
                                src={uploadedVideo.url}
                                width="100%"
                                controls
                            />
                            <Typography variant="h6" textAlign="center">Video</Typography>
                        </Container>
                    ) : (
                        <Container sx={style.uploadWrapper}>
                            <Button variant="text" component="label" sx={{
                                height: "180px",
                                width: "180px",
                            }}>
                                <UploadFileIcon sx={{height: "100%", width: "100%", color: "black"}}/>
                                <input hidden accept="video/*" type="file" onChange={handleUploadVideo}/>
                            </Button>
                            <Typography variant="h6" textAlign="center">Video</Typography>
                        </Container>
                    )}

                    <Divider/>

                    {uploadedCover ? (
                        <Container sx={style.uploadMediaContainer}>
                            <img
                                src={uploadedCover.url}
                                width="100%"
                                alt="cover"
                            />
                            <Typography variant="h6" textAlign="center">Cover</Typography>
                        </Container>
                    ) : (
                        <Container sx={style.uploadWrapper}>
                            <Button variant="text" component="label" sx={{
                                height: "180px",
                                width: "180px",
                            }}>
                                <UploadFileIcon sx={{height: "100%", width: "100%", color: "black"}}/>
                                <input hidden accept="image/*" type="file" onChange={handleUploadCover}/>
                            </Button>
                            <Typography variant="h6" textAlign="center">Cover</Typography>
                        </Container>
                    )}


                    <Container>
                        <TextField
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            size="medium"
                            multiline
                            rows={4}
                            fullWidth
                            value={description}
                            onChange={changeDescription}
                        />
                    </Container>
                    <Container sx={style.uploadButtonWrapper}>
                        <Button variant="contained" onClick={handleUploadClose}>
                            Upload
                        </Button>
                    </Container>
                    {showAlert && <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                        open={open}
                        message="Successful"
                    >
                        <Alert severity="success">Post Uploaded Successful!</Alert>
                    </Snackbar>}
                </Box>
            </Modal>
        </>
    )
}

export default UploadModal;