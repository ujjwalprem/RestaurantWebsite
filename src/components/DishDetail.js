import React, { Component } from 'react';
import { Card,CardImg, CardBody, CardTitle, CardText,Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import {Link} from "react-router-dom";
import { LocalForm, Control, Errors, combineForms } from 'react-redux-form';
import {Loading} from "./Loading";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
    
    this.state={
        isModalOpen:false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}


    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }
    handleSubmit(values){

        this.props.postyComment(this.props.dishId, values.rating, values.author, values.comment);
        this.toggleModal();
      


    }

    render(){
    return(
        <React.Fragment>
           <Button outline onClick={this.toggleModal}>
               <span className="fa fa-pencil fa-lg">Submit Comment</span>
           </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
              <ModalBody>
                  <LocalForm onSubmit={ values => this.handleSubmit(values)}>
                      <div className="form-group">
                          <Label htmlFor="rating">Rating</Label>
                          <Control.select model=".rating" id="rating" name="rating" className="form-control" defaultValue={1}>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                          </Control.select>
                      </div>
                      <div className="form-group">
                          <Label htmlFor="author">Your Name</Label>
                          <Control.text model=".author" id="author" name="author" className="form-control" placeholder="Your name"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                           <Errors className="text-danger" model=".author" show="touched"
                                   messages={{
                                       required:"Required",
                                       maxLength:"Must be greater than 2 characters",
                                       minLength:"Must be 15 characters or less"
                                   }}             
                               />    
                      </div>
                      <div className="form-group">
                          <Label htmlFor="comment">Comment</Label>
                          <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows={8} />
                      </div>
                      <Button type="submit" color="primary" >Submit</Button>
                  </LocalForm>
              </ModalBody>
          </Modal> 


        </React.Fragment>

    );
    }

}



function RenderComment({comments, postComment,dishId}){
       if (comments !=null) {
         
              return (
                  <div className='col-12 col-md-5 m-1'>
                  <h4>Comments</h4>
                  <ul className="lust-unstyled">
                  <Stagger in>
                  {comments.map((comment)=> {
                      return(
                          <Fade in>
                        <li key={comment.id}>
                   <p>{comment.comment}</p>
                   <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                   </p>
                 </li>
                 </Fade>
                      );
                  })}</Stagger>
                </ul>
                <CommentForm  dishId={dishId} postComment={postComment} />
                </div>
  
    );}
    else
    return(
        <div></div>
    );
}

function DishItem({dish}){
    if(dish!=null){
     return(
         <div className='col-12 col-md-5 m-1'>
         <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
             <Card>
                 <CardImg width='100%' src={baseUrl+ dish.image} alt={dish.name} />
                 <CardBody>
                     <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                 </CardBody>
             </Card>
             </FadeTransform>
         </div>
     )}else{
         return(<div></div>)
     }
 }


function DishDetail(props){
   if(props.isLoading){
       return(
         <div className="container">
             <div className="row">
                 <Loading />
             </div>
         </div>
       );
   }
   else if(props.errMess){
    return(
        <div className="container">
            <div className="row">
            <h4>{props.errMess}</h4>
            </div>
        </div>
      );
   }else

    if(props.dish!=null){
   return(
    <div className='container'>
    <div className='row'>
     <Breadcrumb>
          
           <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
           <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
           <h3>{props.dish.name}</h3>
           <hr />
        </div>
        <div className='row'>
           <DishItem dish={props.dish} />
           <RenderComment comments={props.comments}    postComment={props.postComment}
        dishId={props.dish.id}/>
        </div>
        </div>
        </div>
    );
   }
}

export default DishDetail;