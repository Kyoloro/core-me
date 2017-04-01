function pr() {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 1000)
    })
}

async function fn() {
    await pr()
}

fn().catch(e => { console.error('error') })