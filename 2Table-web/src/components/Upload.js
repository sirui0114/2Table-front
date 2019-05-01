import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import React from 'react';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
/*
    We need to register the required plugins to do image manipulation and previewing.
    */
    registerPlugin(
    	FilePondPluginImageExifOrientation, FilePondPluginImagePreview
    );

export class Upload extends React.Component {
constructor(props) {
        super(props)
        this.state = {
        }
      }

render(){

    return(
                <FilePond ref={ref => this.pond = ref}
                          allowMultiple={false}
                          onupdatefiles= {() => {this.props.importFile(this.pond.getFiles())}}>
                </FilePond>);
};
}