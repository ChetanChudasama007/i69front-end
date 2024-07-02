import Link from 'next/link';
import { CircledCrossIcon } from '../Home2';
import { CustomButton, CloseIconStyles, InnerContainer, ModalContainer, Text } from './SubscribeModal';

const BalanceModal = ({ coins, close, }) => {
    return (
        <ModalContainer>
            <InnerContainer sx={{ height: '357px' }}>
                <CircledCrossIcon sx={CloseIconStyles} onClick={() => { close(); console.log('User Balance Closed'); }} />

                <img src="/images/coins-2.png" alt="icon" style={{ marginTop: '16px' }} />

                <Text sx={{ fontWeight: 300, mt: 3, }}>User Balance</Text>

                <Text sx={{ fontWeight: 700, fontSize: '24px', mt: 1, }}>{coins}</Text>

                <Text style={{ fontSize: '16px', fontWeight: 700 }}>Coins</Text>

                <Link href="buy-chat-coin" legacyBehavior>
                    <CustomButton onClick={close}> Upgrade your balance </CustomButton>
                </Link>

            </InnerContainer>
        </ModalContainer>
    )
}

export default BalanceModal;
