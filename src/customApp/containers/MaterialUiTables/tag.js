import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

function CheckboxesTagsCourse(props) {
  const [data, setData] = useState([])
  useEffect(()=>{
    async function getData() {
      const res = await axios.get('http://35.244.8.93:7000/api/course/select/all');
      setData(res.data)
    }
    getData()
  },[])

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.name}
      style={{ width: '60rem', margin:5 }}
      renderInput={(params) => <TextField style={{backgroundColor:'white'}} {...params} label={props.label} placeholder={props.placeholder} variant="outlined" />}
    />
  );
}

function CheckboxesTagsSubject(props) {
  const [data, setData] = useState([])
  useEffect(()=>{
    async function getData() {
      const res = await axios.get('http://35.244.8.93:7000/api/subject/select/all');
      setData(res.data)
    }
    getData()
  },[])
  

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.name}
      style={{ width: '60rem', margin:5 }}
      renderInput={(params) => <TextField style={{backgroundColor:'white'}} {...params} label={props.label} placeholder={props.placeholder} variant="outlined" />}
    />
  );
}

function CheckboxesTagsBatch(props) {
  const [data, setData] = useState([])
  useEffect(()=>{
    async function getData() {
      const res = await axios.get('http://35.244.8.93:7000/api/batch/select/all');
      setData(res.data)
    }
    getData()
  },[])
  

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.batch_name}
      style={{ width: '60rem', margin:5 }}
      renderInput={(params) => <TextField style={{backgroundColor:'white'}} {...params} label={props.label} placeholder={props.placeholder} variant="outlined" />}
    />
  );
}

function CheckboxesTagsLecture(props) {
  const [data, setData] = useState([])
  useEffect(()=>{
    async function getData() {
      const res = await axios.get('http://35.244.8.93:7000/api/lecture/select/all');
      setData(res.data)
    }
    getData()
  },[])

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.agenda}
      style={{ width: '60rem', margin:5 }}
      renderInput={(params) => <TextField style={{backgroundColor:'white'}} {...params} label={props.label} placeholder={props.placeholder} variant="outlined" />}
    />
  );
}

export default function CheckboxesTags(props) {
  return (
    <>
    <CheckboxesTagsCourse label={'Course'} placeholder={'Search student by course'} />
    <CheckboxesTagsSubject label={'Subject'} placeholder={'Search student by subject'} />
    <CheckboxesTagsBatch label={'Batch'} placeholder={'Search student by batch'} />
    <CheckboxesTagsLecture label={'Lecture'} placeholder={'Search student by lecture'} />
    </>
  );
}