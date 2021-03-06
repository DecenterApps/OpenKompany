const replicationNodes = [
  'https://ipfs.decenter.com',
];

export const bootstrapNodes = [
  '/dns4/ipfs.decenter.com/tcp/4443/wss/ipfs/QmWv5BiGHbZNQKg48cA1FLJaiM7aBj4NNDc1HmBkxbxhLz',
];

try {

} catch (e) {
  console.error(e);
}

export const uploadFile = data =>
  new Promise((resolve, reject) => {
    window.node.files.add([Buffer.from(JSON.stringify(data))], (err, uploadedFile) => {
      if (err) {
        return reject(err);
      }
      const { hash } = uploadedFile[0];
      replicate(hash, 'json');
      resolve(hash);
    });
  });

export const replicate = (hash, type) => {
  let successful = 0;
  const replicationPromises = replicationNodes.map(node =>
    new Promise((resolve) => {
      const url = `${node}${type === 'file' ?
        '/api/v0/get?arg=' : '/api/v0/object/get?arg='}${hash}`;
      return fetch(url, { method: 'head', mode: 'no-cors' })
        .then(() => {
          successful += 1;
          resolve();
        })
        .catch((error) => {
          console.error(error);
          resolve();
        });
    }),
  );
  Promise
    .all(replicationPromises)
    .then(() =>
      console.log(`Successfully replicated ${type} with hash: ${hash} on ${successful}/${replicationNodes.length} nodes`)
    );
};

export const getFileContent = async (hash) => {
  const ipfsTimeout = setTimeout(() => {
    throw Error('Couldn\'t fetch data. (TIMEOUT)');
  }, 20000);
  try {
    const file = await window.node.files.cat(hash);
    clearTimeout(ipfsTimeout);
    return new TextDecoder('utf-8').decode(file);
  } catch (e) {
    throw Error(e.message);
  }
};
