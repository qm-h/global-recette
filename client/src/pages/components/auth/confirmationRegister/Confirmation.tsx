import {
    Button,
    Container,
    Grid,
    Image,
    Loading,
    Text,
    useTheme,
} from '@nextui-org/react'
import { FaEmpire, FaRebel } from 'react-icons/fa'
import { confirmRegister, hasUUID } from '../../../../router/authRouter'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../../../../lib/theme/toaster'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Confetti from 'react-confetti'
import ConfirmationContent from './ConfirmationContent'
import eatingGif from '../../../../lib/images/giphy.gif'
import partyGif from '../../../../lib/images/party-gif.gif'
import timerBefore from '../../../../lib/utils/timer'
import { useWindowSize } from 'react-use'

const Confirmation = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [waitHasUUID, setWaitHasUUID] = useState(true)
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
        toasterErrorCommon(
            isDark,
            "Vous avez annulé la confirmation ! \n Vous pouvez réessayer ultérieurement !\n Rien n'est perdu !"
        )
        timerBefore(() => navigate('/login'), 3000)
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
                    handleCancel={handleCancel}
                    isLoading={isLoading}
                    handleConfirmation={handleConfirmation}
                />
            )}
        </Container>
    )
}

export default Confirmation
