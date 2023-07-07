{(
  state.list.map(post => {
return <CTableBody xs key={post.title}>

    <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>{post.title}</CTableDataCell>
      <CTableDataCell>{post.description}</CTableDataCell>
      <CTableDataCell>@mdo</CTableDataCell>
    </CTableRow>

    </CTableBody>
})
)}