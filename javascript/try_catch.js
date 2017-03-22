try {
    let a = JSON.parse('str')
} catch (e) {
    console.error(e) // error
} finally {
    console.log('finally') // finally
}