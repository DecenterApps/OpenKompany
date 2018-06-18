import IPFS from 'ipfs';

let node;

const replicationNodes = [
  'https://ipfs.decenter.com',
];

const bootstrapNodes = [
  '/dns4/ipfs.decenter.com/tcp/4443/wss/ipfs/QmWv5BiGHbZNQKg48cA1FLJaiM7aBj4NNDc1HmBkxbxhLz',
];

try {
  node = new IPFS({
    repo: 'open-kompany',
    config: {
      Bootstrap: bootstrapNodes,
      Addresses: {
        Swarm: [],
      },
    }
  });
} catch (e) {
  console.error(e);
}

export const uploadFile = data =>
  new Promise((resolve, reject) => {
    node.files.add([Buffer.from(JSON.stringify(data))], (err, uploadedFile) => {
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

node.once('ready', () => {
  console.log('IPFS Node is ready');
});

