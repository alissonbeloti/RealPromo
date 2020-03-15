using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using RealPromo.Models;

namespace RealPromo.Services
{
    public class RealPromoSignalR
    {
        public RealPromoSignalR(ObservableCollection<Promocao> promocoes)
        {
            Task.Run(async () => { await ConfigurarSignalR(promocoes); });
        }

        private async Task ConfigurarSignalR(ObservableCollection<Promocao> promocoes)
        {
            var connection = new HubConnectionBuilder()
                .WithAutomaticReconnect()
                .WithUrl("https://realpromoapiwebabb.azurewebsites.net/PromoHub").Build();

            connection.On<Promocao>("receberPromocao", (promocao) =>
            {
                Xamarin.Forms.Device.InvokeOnMainThreadAsync(() => { 
                    promocoes.Add(promocao);
                });
            });

            await connection.StartAsync();
        }
    }
}
