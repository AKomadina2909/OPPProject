import React,{Component} from 'react';
import {storage} from '../firebase';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
   
  });

class ImageUpload extends Component{
    constructor(props){
        super(props);
        this.state={
            image:null,
            url:[],
            progress:0,
            success:'',
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
    }
    handleUpload=(e)=>{
        e.preventDefault();
        const {image}=this.state;
        if(image==null) return;
        const uploadTask= storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot)=>{
                const progress=Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                this.setState({success:''});
                this.setState({progress});
            },
            (error)=>{
            },
            ()=>{
                storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                    var urls=this.state.url;
                    urls.push(url);
                    this.setState({urls});
                    const progress=0;
                    this.setState({progress});
                    this.props.setUrl(urls);
                    this.setState({success:'Fotografija uspješno prenesena.'})
                })
            });

    }
    handleChange=e=>{
        if(e.target.files[0]){
            const image=e.target.files[0];
            this.setState(()=>({image}))
        }
    }
    render(){
        const { classes } = this.props;
        return (
            <div>
                <p>Dodaj fotografije</p>
                <progress value={this.state.progress} max="100"></progress>
                <div>
                <input type="file" onChange={this.handleChange}></input>
                </div>
                <div>
                <Button onClick={this.handleUpload} type="submit" variant="contained" color="default">
                Prenesi<CloudUploadIcon />
                </Button>
                </div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className='error'><font color="green" size="3">{this.state.success}</font></div>
            </div>
        
        )
    }
}

ImageUpload.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ImageUpload);