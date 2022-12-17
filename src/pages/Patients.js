import {$host} from "../http/index";
import PatientsList from "../components/PatientsList";
import PatientSearch from "../components/PatientSearch";
import React, { Component } from 'react';
import _ from 'lodash';
import asc from "../images/asc.png"
import desc from "../images/desc.png"

class Patients extends Component {
    state ={
        data: [],
        sort: 'asc',
        sortField: 'id',
        search: ''
    }
    
    async componentDidMount() {
        const {data} = await $host.get('patients/getAll')
        this.setState({
            data: _.orderBy(data, this.state.sortField, this.state.sort)
        })
    }
    
    onSort = sortField => {
        const cloneData = this.state.data.concat();
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc';

        const data = _.orderBy(cloneData, sortField, sort);
    
        this.setState({ data, sort, sortField})
    }
    
    searchHandler = search => {
        this.setState({search})
    }
    
    getFilteredData(){
        const {data, search} = this.state
        
        if (!search) {
          return data
        }
    
        return data.filter(item => {
            return item['secondName'].toLowerCase().includes(search.toLowerCase())
            || item['firstName'].toLowerCase().includes(search.toLowerCase())
            || item['middleName'].toLowerCase().includes(search.toLowerCase())
        })
    }
    
    render() {
        const filteredData = this.getFilteredData();
        return (
            <div className="container">
              
                    <PatientSearch  
                        onSearch={this.searchHandler}
                    />
                
                    <PatientsList 
                        data={filteredData}
                        onSort={this.onSort}
                        sort={this.state.sort}
                        sortField={this.state.sortField}
                    />
                
            </div>
      );
    }
  }

export default Patients