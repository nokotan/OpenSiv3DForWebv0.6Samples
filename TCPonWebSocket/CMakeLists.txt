cmake_minimum_required(VERSION 3.13)

Siv3DAppSetProjectDefaultConfig(TCPonWebSocket)

if (SIV3D_WEBGL_BACKEND)

    target_link_options(TCPonWebSocket
        PRIVATE
            "SHELL:-s WEBSOCKET_URL=\"wss://wss-sample-server.herokuapp.com\""
    )

endif()

if (SIV3D_WEBGPU_BACKEND)

    target_link_options(TCPonWebSocketWebGPU
        PRIVATE
            "SHELL:-s WEBSOCKET_URL=\"wss://wss-sample-server.herokuapp.com\""
    )
    
endif()
