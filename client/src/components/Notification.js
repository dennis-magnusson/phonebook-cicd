import React from 'react'

const Notification = ({ message }) => {
    if (message === null)
        return null
    else {
        return (
            <div className={`${message.type} message`}>
              {message.text}
            </div>
          )
    }
}

export default Notification