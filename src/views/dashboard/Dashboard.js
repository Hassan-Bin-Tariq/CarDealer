
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardImage,
  CCardTitle,
  CCardText,
  CCardSubtitle,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import ReactImg from 'src/assets/images/car.jpeg'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import axios from 'axios';
import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import React, { useState, useEffect } from "react";


const Dashboard = () => {
  // Store sortby order i.e. ascending or descending
  const [sortType, setSortType] = useState("ascending");

  // Sortby field i.e. title or description
  const [sortByField, setSortByField] = useState("title");

  // Store filter/latest posts
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const posts = [];
  //console.log(result)

    console.log(result)
    console.log("calleds")
    if(result.length>0)
    {
      for (let i = 0; i < result[0].length; i++) {
        const post = {
          brand: result[0][i],
          price: result[1][i],
          mileage: result[2][i],
          transmission: result[3][i],
          regDate: result[4][i],
          FuelType: result[5][i],
        };
      
        posts.push(post);
      }
  }
  useEffect(() => {
    axios
      .post('http://localhost:5000/getdata', 'off')
      .then(response => {
        console.log(response.data)
        setResult(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:a', error);
        setLoading(false);
      });
  }, []);

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  // Filter posts on typing in search input
  const handleChange = (e) => {
    const results = posts.filter(post => {
      if (e.target.value === "") return posts;
        return post[sortByField].toLowerCase().includes(e.target.value.toLowerCase())
    })

    setResult(results);

    setstate({
      query: e.target.value,
      list: sortFunc(results, sortType, sortByField)
    })
  }

  // Sort posts depending on sort type and available results
  function sortFunc(results, sortType, sortByField) {
    if (sortType === "ascending") {
      results.sort((a, b) => a[sortByField] < b[sortByField] ? -1 : 1)  
    }
    else if (sortType === "descending") {
      results.sort((a, b) => b[sortByField] > a[sortByField] ? 1 : -1)
    }
    return results;
  }

  // Dropdown to sort posts in ascending or descending order depending on title.
  function updatePosts(e) {
    setSortType(e);
    setstate({
      query: state.query,
      list: !result ? sortFunc(posts, e, sortByField) : sortFunc(result, e, sortByField)
    })
  }

  // Dropdown to sort posts in ascending or descending order depending on title.
  function sortBy(e) {
    setSortByField(e);
    setstate({
      query: state.query,
      list: !result ? sortFunc(posts, sortType, e) : sortFunc(result, sortType, e)
    })
  }



  return (
    <>
      <WidgetsDropdown />
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {loading ? (
          <p>Loading...</p>
        ) : (
        <CTable bordered responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mileage</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Transmission</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Reg Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">FuelType</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Transmission</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date Added</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date Delisted</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              {posts.map(post => (
                  <CTableRow >
                    <CTableDataCell >{post.brand}</CTableDataCell>
                    <CTableDataCell >{post.price}</CTableDataCell>
                    <CTableDataCell >{post.mileage}</CTableDataCell>
                    <CTableDataCell >{post.transmission}</CTableDataCell>
                    <CTableDataCell >{post.regDate}</CTableDataCell>
                    <CTableDataCell >{post.FuelType}</CTableDataCell>
                  </CTableRow>
              ))}
        </CTable>
        )}
        </div>
    </>
  )
}

export default Dashboard
