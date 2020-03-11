using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using RealPromo.ApiWeb.Hubs;

namespace RealPromo.ApiWeb.Models
{
    /// <summary>
    /// RPC 
    /// </summary>
    public class PromoHub: Hub
    {
        /*
         * Cliente - Js/c#/java/ts
         * RPC
         Cliente -> Hub

         */

        public async Task CadastrarPromocao(Promocao promocao)
        {
            await Clients.Caller.SendAsync("cadastradoSucesso");
            await Clients.Others.SendAsync("receberPromocao", promocao);
        }

        public void ReceberPromocao(string empresa, string chamada, string regras, string url)
        {

        } 
    }
}
