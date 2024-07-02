import { gql } from '@apollo/client';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AvatarWrapper, Avatar, CircledCrossIcon } from '../Home2';
import LanguageIcon from '@mui/icons-material/Language';
import { useEffect, useState } from 'react';
import RadionButton from '../../components/elements/RadionButton';
import { clientUpload } from '../../ApolloClient/client';

const SHARE_MOMENT_MUTATION = gql`mutation moment ($file:Upload!, $detail:String!, $userField:String!, $allowComment: Boolean!) {
    insertMoment(Title: "Latest Moment", file: $file, momentDescription: $detail, user: $userField, allowComment: $allowComment) {
        moment {
            user {
                username
            }
            file
            id
        }
    }
}`
// const SHARE_MOMENT_MUTATION = gql`mutation InsertMoment($title: String!, $momentDescription: String!, $user: String!, $allowComment: Boolean, $file: Upload, $moderatorId: String, $stockImageId: Int) {
//     insertMoment(Title: $title, momentDescription: $momentDescription, user: $user, allowComment: $allowComment, file: $file, moderatorId: $moderatorId, stockImageId: $stockImageId) {
//       moment {
//         file
//         id
//         pk
//         momentDescription
//       }
//     }
//   }`

const SHARE_MOMENT2 = gql`mutation scheduleMoment ($file:Upload!, $detail:String!, $userField:String!, $allowComment: Boolean!, $publishAt:DateTime!) {
    insertMoment(Title: "Latest Moment", file: $file, momentDescription: $detail, user: $userField, allowComment: $allowComment, publishAt: $publishAt) {
        moment {
            user {
                username
            }
            file
            id
        }
    }
}`

// ============= Custom Components =============
const AllowCommentButtons = ({ commentAllowed, setCommentAllowed }) => {
    const ToggleButtonA = () => setCommentAllowed(true);
    const ToggleButtonB = () => setCommentAllowed(false);
    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <RadionButton title="Comment Allowed" checked={commentAllowed} onChange={ToggleButtonA} />
            <RadionButton title="Comment not Allowed" checked={!commentAllowed} onChange={ToggleButtonB} />
        </Box>
    )
}

// const ShareMoment = ({ file, momentContent, commentAllowed, setIsShareButtonClicked }) => {
//     console.log('file', file);
//     const formData = new FormData();
//     formData.append('photo', file);
//     // console.log(formData, 'formdata');
//     // const [xyz, { data, loading, error }] = useMutation(SHARE_MOMENT, {
//     const { data, error, loading } = useMutation(SHARE_MOMENT_MUTATION, {
//         variables: {
//             file: file,
//             detail: momentContent,
//             userField: 'xyz',
//             allowComment: commentAllowed,
//         }
//     });
//     // console.log('xyz', xyz);
//     console.log('data', data);
//     console.log('error', error);
//     console.log('loading', loading);
//     setIsShareButtonClicked(false);


//     // setCurrentScreen('home');
//     return <div />
// }

const generateString = (length) => {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const ShareMomentScreen = ({ setCurrentScreen }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [momentContent, setMomentContent] = useState(null);
    const [commentAllowed, setCommentAllowed] = useState(true);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    // const [isShareButtonClicked, setIsShareButtonClicked] = useState(false);
    const [userId, setUserId] = useState();
    useEffect(() => {
        // Retrieve userId from localStorage on component mount
        const id = localStorage.getItem('userId');
        setUserId(id || '');
    }, []);

    // const [insertMoment, { data, error, loading }] = useMutation(SHARE_MOMENT_MUTATION);
    // const [insertMoment] = useMutation(SHARE_MOMENT_MUTATION);


    const handleFileChange = (event) => {
        // let image;
        const selectedFile = event.target.files[0];
        if (!selectedFile) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            // Update state with the data URL of the selected image
            setSelectedImage(e.target.result);
        };

        reader.onerror = (error) => {
            // Handle errors that occur during file reading
            console.error('File reading error:', error);
        };

        // Read the file as a data URL
        reader.readAsDataURL(selectedFile);


        console.log('Selected File:', selectedFile);
        // image = selectedFile;
        setFile(selectedFile);
    };


    const handleShareMoment = async () => {
        if (!file || !momentContent) {
            console.error('Please fill in all fields');
            return;
        }
        setLoading(true);
        console.log('file', file);
        console.log('userId', userId);
        // const formData = new FormData();
        // formData.append('file', file);
        // console.log(formData, 'formdata');
        try {
            // Call the insertMoment mutation
            const result = await clientUpload.mutate({
                mutation: SHARE_MOMENT_MUTATION,
                variables: {
                    file: file,
                    detail: momentContent,
                    userField: userId,
                    allowComment: commentAllowed,
                }
            });
            console.log('Moment inserted successfully:', result);
            console.log('Moment inserted successfully:', result?.data?.insertMoment?.moment?.id);
            if (result?.data?.insertMoment?.moment?.id) {
                setLoading(false);
                setCurrentScreen('home');
            }
        } catch (error) {
            console.error('Error inserting moment:', error);
        }
    };


    // if (loading) return <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}><CircularProgress /></div>



    return (
        <Box className='moment-upload-section'>
            <Box className="col-lg-6 col-12" sx={{ pl: 2, pr: 1, pt: 1 }}>
                <Box sx={{ backgroundColor: '#1F243080', p: 3, borderRadius: '10px', minHeight: '360px' }}>
                    <Box className='image-upload-section'>
                        <img src="/images/uploadIcon.svg" height='75px' width='75px' />
                        <Typography sx={{ fontWeight: 700 }}>Drag & Drop to upload file</Typography>
                        <Typography sx={{ fontWeight: 700, mt: -2.5 }}>OR</Typography>
                        <label htmlFor="file-upload" className="moment-file-upload">Select file to upload</label>
                        <input id="file-upload" type="file" onChange={handleFileChange} />
                        {selectedImage &&
                            <Box sx={{ position: 'relative' }}>
                                <CircledCrossIcon sx={{ right: -10, top: -10 }}
                                    onClick={() => { setSelectedImage(null); setFile(null) }} />
                                {selectedImage?.includes('image') ? <img src={selectedImage} alt="Selected" className='image-preview' />
                                    :
                                    <video className='image-preview' controls autoPlay>
                                        <source src={selectedImage}></source>
                                    </video>
                                }

                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
            <Box className="col-lg-6 col-12 moment-editor-container">
                <Box sx={{ backgroundColor: '#1F243080', p: 3, borderRadius: '10px', width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 5 }}>
                        <AvatarWrapper>
                            <Avatar src="/images/model24.png" alt="" sx={{ height: 45, width: 45, maxHeight: 45, maxWidth: 45 }} />
                        </AvatarWrapper>
                        <textarea placeholder='What is going to share' className='moment-editor' onChange={(e) => setMomentContent(e.target.value)} />
                    </Box>
                    <AllowCommentButtons commentAllowed={commentAllowed} setCommentAllowed={setCommentAllowed} />

                    <Box sx={{ color: '#ffffff', fontSize: '16px', mt: 5 }}>
                        <LanguageIcon sx={{ width: 25, height: 25 }} />
                        <span> Posting will appear on your feed</span>
                    </Box>
                </Box>
                {/* <button className="global-btn-3" onClick={ShareMomentHandler}>SHARE</button> */}
                <button className="global-btn-3" onClick={handleShareMoment} disabled={loading}>
                    {!loading ? "SHARE" : <CircularProgress sx={{ color: '#3A3A3A' }} />}
                </button>

            </Box>
            {/* {isShareButtonClicked && (
                <ShareMoment
                    file={file}
                    momentContent={momentContent}
                    commentAllowed={commentAllowed}
                    setIsShareButtonClicked={setIsShareButtonClicked}
                />
            )} */}
        </Box>
    )
}

export default ShareMomentScreen
