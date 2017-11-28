"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
    mixins: [
            Router.Navigation
        ],
        
    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },
        
    getInitialState: function() {
        return {
            course: { id: '', title: '', author: {id: '', name: ''}, length: '', category: '' },
            authors: { id: '', firstName: '', lastName: ''},
            errors: {},
            dirty: false
        };
    },
    
    componentWillMount: function() {
      var courseId = this.props.params.id; //from the path '/course:id'
      
      if (courseId) {
          this.setState({course: CourseStore.getCourseById(courseId)});
      }
      
      this.setState({authors: AuthorStore.getAllAuthors()});
    },
    
    setCourseState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        
        if (field == "author") {
            var selectedText = event.target.options[event.target.selectedIndex].text;
            //create author object with id and name
            this.state.course[field] = {id: value, name: selectedText};
        }
        
        else {
        this.state.course[field] = value;
        }
        return this.setState({course: this.state.course});
    },
    
    courseFormIsValid: function() {
      var formIsValid = true;
      this.state.errors = {}; //clear any previous errors.
      if (this.state.course["author"].id=="") {
          this.state.errors.author = 'Please select an author';
          this.setState({errors: this.state.errors});
          formIsValid = false;
      }
      
      if (this.state.course.title.length == 0 ) {
          this.state.errors.title = 'Please type a title for the course';
          this.setState({errors: this.state.errors});
      }
    //  
    //  if (this.state.cous.firstName.length < 3) {
    //      this.state.errors.firstName = 'First Name must be at least 3 characters.';
    //      formIsValid = false;
    //  }
    //  
    //  if (this.state.author.lastName.length < 3) {
    //      this.state.errors.lastName = 'Last Name must be at least 3 characters.';
    //      formIsValid = false;
    //  }
      return formIsValid;
    },
    
    saveCourse: function(event) {
        event.preventDefault();
        
        if (!this.courseFormIsValid()) {
            return;
        }
        
        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }
        
        this.setState({dirty: false});
        toastr.success('Course saved.');
        this.transitionTo('courses');
    },
    
    render: function() {
        return (
            <CourseForm 
                course={this.state.course}
                authors={this.state.authors}
                onChange={this.setCourseState}
                onSave={this.saveCourse}
                errors= {this.state.errors}/>
            );
    }
});

module.exports = ManageCoursePage;