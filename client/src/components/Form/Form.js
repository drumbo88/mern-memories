import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const post = useSelector((state) => currentId ? state.posts.find(post => post._id === currentId) : null)

    const defaultData = { creator: '', title: '', message: '', tags: '', selectedFile: null }
    const [postData, setPostData] = useState(defaultData)

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, postData))
        }
        else {
            dispatch(createPost(postData))
        }
        clear()
    }
    const clear = () => {
        setCurrentId(null)
        setPostData(defaultData)
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} 
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value})} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} 
                    onChange={(e) => setPostData({ ...postData, title: e.target.value})} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} 
                    onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
                <TextField name="tags" variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} 
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(/\s*,\s*/) })} />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file" multiple={false} name="selectedFile" value={postData.selectedFile} 
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                        />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form