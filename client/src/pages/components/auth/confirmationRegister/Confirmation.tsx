import { Container, Loading, useTheme } from '@nextui-org/react'
import { confirmRegister, hasUUID } from '../../../../router/authRouter'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../../../../utils/theme/toaster'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Confetti from 'react-confetti'
import ConfirmationContent from './ConfirmationContent'
import darkSideGif from '../../../../utils/images/assets/gif/dark-side.gif'
import eatingGif from '../../../../utils/images/assets/gif/giphy.gif'
import partyGif from '../../../../utils/images/assets/gif/party-gif.gif'
import timerBefore from '../../../../utils/timer'
import { useWindowSize } from 'react-use'

const Confirmation = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [waitHasUUID, setWaitHasUUID] = useState(true)
    const [isCancel, setIsCancel] = useState(false)
    const { width, height } = useWindowSize()
    const { token } = useParams() // token from url
    const { isDark } = useTheme()
    const navigate = useNavigate()
    const handleConfirmation = async () => {
        setIsLoading(true)
        await confirmRegister(token)
            .then((res) => {
                if (res.status === 200) {
                    toasterSuccessCommon(
                        isDark,
                        'Confirmation réussie ! Vous avez fais le bon choix !'
                    )
                    setIsConfirmed(true)
                    timerBefore(() => navigate('/login'), 3000)
                } else {
                    toasterErrorCommon(isDark, 'Une erreur est survenue')
                }
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        Promise.all([hasUUID(token)]).then(([res]) => {
            if (res.status === 403) {
                setWaitHasUUID(true)
                navigate('/login')
            } else {
                setWaitHasUUID(false)
            }
        })
    }, [navigate, token])

    const handleCancel = () => {
        setIsCancel(true)
        timerBefore(() => navigate('/login'), 4000)
    }
    return (
        <Container
            css={{
                h: '100vh',
                w: '90%',
            }}
            display="flex"
            justify="center"
            alignItems="center"
            responsive
        >
            {isConfirmed && <Confetti width={width} height={height} />}
            {waitHasUUID ? (
                <Loading color="primary" size="xl" />
            ) : (
                <ConfirmationContent
                    isConfirmed={isConfirmed}
                    partyGif={partyGif}
                    eatingGif={eatingGif}
                    darkSideGif={darkSideGif}
                    handleCancel={handleCancel}
                    isLoading={isLoading}
                    isCancel={isCancel}
                    handleConfirmation={handleConfirmation}
                />
            )}
        </Container>
    )
}

export default Confirmation
