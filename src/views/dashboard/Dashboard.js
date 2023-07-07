
import "./Dashboard.css"
import { PiSteeringWheelBold } from 'react-icons/pi';
import { IoCarSportSharp } from 'react-icons/io5';
import { BsFillFuelPumpFill } from 'react-icons/bs';
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
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
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

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import React, { useState, useEffect } from "react";


const Dashboard = () => {
  // Store sortby order i.e. ascending or descending
  const [sortType, setSortType] = useState("ascending");

  // Sortby field i.e. title or description
  const [sortByField, setSortByField] = useState("title");

  // Store filter/latest posts
  const [result, setResult] = useState();
  
  const posts = [
    { title: 'Lamborghini',price: '$200', image:'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2023/revuelto/revuelto_m.png', description: 'Automobili Lamborghini S.p.A. is an Italian manufacturer of luxury sports cars and SUVs based in Sant Agata Bolognese.'},
    { title: 'Mercedes',price: '$300',image:'https://www.carscoops.com/wp-content/uploads/2023/02/2022-Mercedes-CLS.jpg', description: 'Mercedes-Benz, commonly referred to as Mercedes and sometimes as Benz, is a German luxury and commercial.'},
    { title: 'BMW',price: '$500',image:'https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/brands/bmw_i/2023/230201_BMW_Group_BMW_i4eDrive40.png', description: 'TBayerische Motoren Werke AG, abbreviated as BMW, is a German multinational manufacturer of luxury vehicles and motorcycles headquartered in Munich'},
    { title: 'Honda',price: '$100',image:'https://www.motortrend.com/uploads/sites/10/2022/11/2023-honda-civic-sport-5door-hatchback-angular-front.png', description: 'Honda Motor Co., Ltd. is a Japanese public multinational conglomerate manufacturer of automobiles, motorcycles, and power equipment, headquartered in Minato, Tokyo, Japan.'},
    { title: 'Lamborghini',price: '$200', image:'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2023/revuelto/revuelto_m.png', description: 'Automobili Lamborghini S.p.A. is an Italian manufacturer of luxury sports cars and SUVs based in Sant Agata Bolognese.'},
    { title: 'Mercedes',price: '$300',image:'https://www.carscoops.com/wp-content/uploads/2023/02/2022-Mercedes-CLS.jpg', description: 'Mercedes-Benz, commonly referred to as Mercedes and sometimes as Benz, is a German luxury and commercial.'},
    { title: 'BMW',price: '$500',image:'https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/brands/bmw_i/2023/230201_BMW_Group_BMW_i4eDrive40.png', description: 'TBayerische Motoren Werke AG, abbreviated as BMW, is a German multinational manufacturer of luxury vehicles and motorcycles headquartered in Munich'},
    { title: 'Honda',price: '$100',image:'https://www.motortrend.com/uploads/sites/10/2022/11/2023-honda-civic-sport-5door-hatchback-angular-front.png', description: 'Honda Motor Co., Ltd. is a Japanese public multinational conglomerate manufacturer of automobiles, motorcycles, and power equipment, headquartered in Minato, Tokyo, Japan.'},
  
  ]


  const [state, setstate] = useState({
    query: '',
    list: posts
  })


  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)


  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]


  const card = {
    background: "aliceblue",
    border: "2px solid aqua",
    borderRadius: "25px",
    paddingLeft: "60px",
    marginBottom: "25px"
  };

  const margin = {
    marginLeft: "100px"
  };




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
      <div>
        {/* <form>
          <span style={margin}>Search</span>
        <input onChange={handleChange} value={state.query} type="search"/>

          <span style={margin}>Sort By</span>
          <select defaultValue={'title'} onChange={(e) => sortBy(e.target.value)}>
            <option value="title" disabled>None</option>
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="price">Price</option>
          </select>

          <span style={margin}>Sort By</span>
          <select defaultValue={'DEFAULT'} onChange={(e) => updatePosts(e.target.value)}>
            <option value="DEFAULT" disabled>None</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>

          </select>
      </form> */}
        {/* <div class="form-group">
          <label>Car Condition</label>
          <select class="select">
          <option value="1">All Status</option>
          <option value="2">New Car</option>
          <option value="3">Used Car</option>
          </select>
        </div> */}
      </div>      
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>

      {/* {(
              state.list.map(post => {
            return <CCol xs key={post.title}>
                <CCard >
                  <CCardImage orientation="top" src={post.image} />
                  <CCardTitle>{post.title}</CCardTitle>
                  <CCardSubtitle style={{ color: 'red' }}>{post.price}</CCardSubtitle>
                  <CCardText>{post.description}</CCardText>
                </CCard>
                </CCol>
            })
      )} */}
      {(
              state.list.map(post => {
            return <CCol xs key={post.title}>


                <div class="card2">
                  <div class="imgBx2">
                    <img src={post.image}/>
                  </div>
                  <div class="content">
                    <div class="details">
                      <h2>{post.title}<br /><span>{post.price}</span></h2>
                      <div class="data">
                        <h3><PiSteeringWheelBold size={15} color="red"  /><br /><span>Automatic</span></h3>
                        <h3><IoCarSportSharp size={20} color="red"/><br /><span>Model: 2023</span></h3>
                        <h3><BsFillFuelPumpFill size={12} color="red"/><br /><span>Hybrid</span></h3>
                      </div>
                      <div class="actionBtn">
                        <button>Buy</button>
                        <button>Details</button>
                      </div>
                    </div>
                  </div>
                </div>

                </CCol>
            })
      )}

      </CRow>

    </>
  )
}

export default Dashboard
