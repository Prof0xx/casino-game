import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Alert } from 'react-bootstrap'
import { translate } from '../../translations/translate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

function WalletConnect(props) {
    const { lang, onWalletConnected } = props
    const [walletAddress, setWalletAddress] = useState('')
    const [isConnecting, setIsConnecting] = useState(false)
    const [error, setError] = useState('')
    const [walletType, setWalletType] = useState('')

    // Check if wallet is already connected on component mount
    useEffect(() => {
        checkWalletConnection()
    }, [])

    // Check for existing wallet connection
    const checkWalletConnection = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' })
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0])
                    setWalletType('MetaMask')
                    if (onWalletConnected) {
                        onWalletConnected(accounts[0], 'MetaMask')
                    }
                }
            } catch (error) {
                console.error('Error checking wallet connection:', error)
            }
        }
    }

    // Connect to MetaMask
    const connectMetaMask = async () => {
        if (typeof window.ethereum === 'undefined') {
            setError('MetaMask is not installed. Please install MetaMask to continue.')
            return
        }

        setIsConnecting(true)
        setError('')

        try {
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })

            if (accounts.length > 0) {
                const address = accounts[0]
                setWalletAddress(address)
                setWalletType('MetaMask')
                
                // Listen for account changes
                window.ethereum.on('accountsChanged', handleAccountsChanged)
                window.ethereum.on('chainChanged', handleChainChanged)

                if (onWalletConnected) {
                    onWalletConnected(address, 'MetaMask')
                }
            }
        } catch (error) {
            if (error.code === 4001) {
                setError('Please connect your wallet to continue.')
            } else {
                setError('Failed to connect wallet. Please try again.')
            }
        } finally {
            setIsConnecting(false)
        }
    }

    // Handle account changes
    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            // User disconnected wallet
            setWalletAddress('')
            setWalletType('')
            setError('Wallet disconnected. Please reconnect to continue.')
        } else {
            // User switched accounts
            setWalletAddress(accounts[0])
            if (onWalletConnected) {
                onWalletConnected(accounts[0], walletType)
            }
        }
    }

    // Handle chain changes
    const handleChainChanged = (chainId) => {
        // Reload the page to ensure consistency
        window.location.reload()
    }

    // Disconnect wallet
    const disconnectWallet = () => {
        setWalletAddress('')
        setWalletType('')
        setError('')
        
        // Remove event listeners
        if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
            window.ethereum.removeListener('chainChanged', handleChainChanged)
        }

        if (onWalletConnected) {
            onWalletConnected('', '')
        }
    }

    // Format wallet address for display
    const formatAddress = (address) => {
        if (!address) return ''
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    }

    return (
        <div className="wallet_connect_container">
            <div className="wallet_header">
                <FontAwesomeIcon icon={faWallet} className="wallet_icon" />
                <h4>{translate({lang: lang, info: "connect_wallet"})}</h4>
                <p>{translate({lang: lang, info: "wallet_required_text"})}</p>
            </div>

            {error && (
                <Alert variant="danger" className="wallet_error">
                    <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
                </Alert>
            )}

            {walletAddress ? (
                <div className="wallet_connected">
                    <Alert variant="success">
                        <FontAwesomeIcon icon={faCheckCircle} /> 
                        {translate({lang: lang, info: "wallet_connected"})}
                    </Alert>
                    <div className="connected_info">
                        <Row>
                            <Col sm={4} className="label_container">
                                <div className="label">{translate({lang: lang, info: "wallet_type"})}</div>
                            </Col>
                            <Col sm={8}>
                                <div className="wallet_value">{walletType}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4} className="label_container">
                                <div className="label">{translate({lang: lang, info: "wallet_address"})}</div>
                            </Col>
                            <Col sm={8}>
                                <div className="wallet_value" title={walletAddress}>
                                    {formatAddress(walletAddress)}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={disconnectWallet}
                        className="disconnect_button"
                    >
                        {translate({lang: lang, info: "disconnect_wallet"})}
                    </Button>
                </div>
            ) : (
                <div className="wallet_options">
                    <Button 
                        onClick={connectMetaMask}
                        disabled={isConnecting}
                        className="mybutton button_fullcolor wallet_connect_btn"
                    >
                        {isConnecting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                {translate({lang: lang, info: "connecting"})}...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faWallet} className="me-2" />
                                {translate({lang: lang, info: "connect_metamask"})}
                            </>
                        )}
                    </Button>
                    
                    <div className="wallet_info">
                        <small className="text-muted">
                            {translate({lang: lang, info: "wallet_security_note"})}
                        </small>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WalletConnect 