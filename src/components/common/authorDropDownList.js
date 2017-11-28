"use strict";

var React = require('react');

var AuthorDropDownList = React.createClass({
    //propTypes: {
    //    name: React.PropTypes.string.isRequired,
    //    label: React.PropTypes.string.isRequired,
    //    onChange: React.PropTypes.func.isRequired,
    //    placeholder: React.PropTypes.string,
    //    value: React.PropTypes.string,
    //    error: React.PropTypes.string
    //},
    
    //getInitialState: function() {
    //   return{
    //       selectValue: this.props.course.author.id
    //    };
    //},
    
    //handleChange:function(e){
    //    this.setState({selectValue:e.target.value});
    //    this.props.onChange;
    //},
    
    render: function() {
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }
        
        return (
            <div className={wrapperClass}>
                <div className="field">
                    <label htmlFor={this.props.name}>Authors</label> <br />
                    <select name={this.props.name} className = "form-control" onChange={this.props.onChange}>
                            {this.renderListItems()}
                    </select>
                    <div className = "input">{this.props.error}</div>
                </div>
            </div>
            );
    },
    
    renderListItems: function() {
        var items = [];
        items.push(<option value="">--Please Select an Author--</option>);
        for (var i = 0; i < this.props.list.length; i++) {
            var item = this.props.list[i];
            if (item.id == this.props.course.author.id) {
                items.push(<option value={item.id} selected="true">{item.firstName} {item.lastName}
                    </option>);
            }
            
            else {
            items.push(<option value={item.id}>{item.firstName} {item.lastName}
                    </option>);
            }
        }
        return items;
    }
});

module.exports = AuthorDropDownList;