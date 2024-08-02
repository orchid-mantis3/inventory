'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc, } from 'firebase/firestore'
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '3px dashed #205d8a',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    bgcolor:"#e4feff"
  }
export default function Home() {
  const [inventory, setInventory]= useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () =>   {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  const removeItem = async (item) =>{
    const docRef = doc(collection(firestore,'inventory'),item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity===1){
        await deleteDoc(docRef)
      }else{
        await setDoc(docRef,{quantity: quantity-1})
      }
    }

    await updateInventory()
  }

  const addItem = async (item) =>{
    const docRef = doc(collection(firestore,'inventory'),item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
        await setDoc(docRef,{quantity: quantity+1})
      }else{
        await setDoc(docRef,{quantity:1})
      
    }

    await updateInventory()
  }
  useEffect(() => {
    updateInventory()
  }, [])

const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)
  return (
  <Box width="100vw"height="100vh"display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
    <Modal
    open={open}onClose={handleClose}>
      <Box sx={style}>
        <Typography variant='h6' fontFamily="Courier New" fontWeight="bold" color="#0f2c56">Add Item</Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField variant='outlined' fullWidth value={itemName} onChange={(e)=>{setItemName(e.target.value)}}/>
          <Button variant="outlined" onClick={()=>{
            addItem(itemName)
            setItemName('')
            handleClose()
          }}><Typography color="#0f2c56"fontFamily="Courier New">Add</Typography></Button>
        </Stack>
      </Box>
    </Modal>
    <Button variant="contained" justifyContent="space-between" onClick={()=>{
      handleOpen()
    }}>Add New Item</Button>
    <Box border="5px solid #205d8a" bgcolor="#b4dfff" borderRadius="10px">
      <Box width="800px" height="100px" bgcolor="#86a1db" alignItems="center" display="flex" justifyContent="center"><Typography variant='h2' color='#0f2c56' fontFamily="Courier New">
        Inventory Items
      </Typography>
        </Box>
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
        {inventory.map(({name, quantity}) =>(
            <Box key={name} width="100%" minHeight="150px" display="flex" alignItems="center" justifyContent="space-between" padding={5}>
              <Typography variant="h3" color="#0f2c56" fontFamily="Courier New"textAlign="center">
                {name.charAt(0).toUpperCase()+ name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#0f2c56" fontFamily="Courier New" textAlign="center">
                {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={()=>{
                addItem(name)
              }}>
              Add
              </Button>
              <Button variant="contained" onClick={()=>{
                removeItem(name)
              }}>
              Remove
              </Button>
              </Stack>
            </Box>
          ))}
      </Stack>
      </Box>
  </Box>
  )
}

