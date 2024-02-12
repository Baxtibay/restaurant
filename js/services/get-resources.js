// async / await
async function getResources() {
  try {
    const response = await fetch('http://localhost:3000/offers')
    return await response.json()
  } catch(e) {
    console.log('Error');
  } finally {
    console.log('Finally');
  }
}

export default getResources