#[derive(Debug)]
pub struct DMXDisconnectionError;

impl std::fmt::Display for DMXDisconnectionError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "DMX Port disconnected")
    }
}

impl std::error::Error for DMXDisconnectionError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        None
    }
}

#[derive(Debug)]
pub enum DMXChannelValidityError {
    TooHigh,
    TooLow,
}

impl std::fmt::Display for DMXChannelValidityError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            DMXChannelValidityError::TooHigh => write!(f, "DMX channel too high"),
            DMXChannelValidityError::TooLow => write!(f, "DMX channel too low"),
        }
    }
}

impl std::error::Error for DMXChannelValidityError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        None
    }
}
