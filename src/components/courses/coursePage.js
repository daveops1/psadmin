"use strict";

var React = require('react');
var Route = require('react-router');
var Link = require('react-router').Link;
var CourseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');
var CourseList = require('./courseList');

var CoursePage = React.createClass({
    getInitialState: function() {
        return {
            courses: CourseStore.getAllCourses()
        };
    },
    
    componentWillMount: function () {
        CourseStore.addChangeListener(this._onChange);
    },
    
    //Clean up when this component is unmounted
    componentWillUnmount: function () {
        CourseStore.removeChangeListner(this._onChange);
    },
    
    _onChange: function() {
        debugger;
        this.setState({ courses: CourseStore.getAllCourses() });
    },
    
    render: function () {
        
        return (
            <div>
                <h1>Courses</h1>
                <Link to="addCourse" className="btn btn-default">Add Course</Link>
                <CourseList courses={this.state.courses} />
            </div>
            );
    }
});

module.exports = CoursePage;