#ifndef http_client_wasm_h
#define http_client_wasm_h

#pragma once

#include <string>

using namespace std;
using namespace epee::net_utils::http;

namespace epee
{
  namespace net_utils
  {
    namespace http
    {
      class http_client_wasm
      {
      public:
        http_client_wasm() : m_user(boost::none), m_is_connected(false), m_response_info() { }
        ~http_client_wasm() {
          disconnect();
        }
        void set_server(std::string host, std::string port, boost::optional<login> user, ssl_options_t ssl_options = ssl_support_t::e_ssl_support_autodetect);
        void set_auto_connect(bool auto_connect);
        bool connect(std::chrono::milliseconds timeout);
        bool disconnect();
        bool is_connected(bool *ssl = NULL);
        bool invoke(const boost::string_ref uri, const boost::string_ref method, const string& body, std::chrono::milliseconds timeout, const http_response_info** ppresponse_info = NULL, const fields_list& additional_params = fields_list());
        bool invoke_get(const boost::string_ref uri, std::chrono::milliseconds timeout, const string& body = string(), const http_response_info** ppresponse_info = NULL, const fields_list& additional_params = fields_list());
        bool invoke_post(const boost::string_ref uri, const string& body, std::chrono::milliseconds timeout, const http_response_info** ppresponse_info = NULL, const fields_list& additional_params = fields_list());
        uint64_t get_bytes_sent() const;
        uint64_t get_bytes_received() const;

      private:
        string m_host;
        string m_port;
        boost::optional<login> m_user;
        bool m_ssl_enabled;
        bool m_is_connected;
        http_response_info m_response_info;

        bool invoke_json(const boost::string_ref uri, const boost::string_ref method, const std::string& body, std::chrono::milliseconds timeout, const http_response_info** ppresponse_info, const fields_list& additional_params);
        bool invoke_binary(const boost::string_ref uri, const boost::string_ref method, const std::string& body, std::chrono::milliseconds timeout, const http_response_info** ppresponse_info, const fields_list& additional_params);
      };
    }
  }
}

#endif /* http_client_wasm_h */
