import React from 'react';
import {createHmac} from "crypto"

function generateAppSecretProof(appId, appSecret) {
  const hmac = createHmac('sha256', appSecret);
  hmac.update(appId);
  const signature = hmac.digest('hex');
  return signature;
}

const AppSecretProof = ({ appId, appSecret }) => {
  const appSecretProof = generateAppSecretProof(appId, appSecret);

  return (
    <div>
      <input type="hidden" name="appsecret_proof" value={appSecretProof} />
    </div>
  );
};

export default AppSecretProof;