using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RealPromo.Models;
using RealPromo.Services;
using Xamarin.Forms;

namespace RealPromo
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : ContentPage
    {
        ObservableCollection<Promocao> promocoes = new ObservableCollection<Promocao>();
        public MainPage()
        {
            InitializeComponent();
            //ListaPromocoes();
            new RealPromoSignalR(promocoes);
            ListViewPromocao.ItemsSource = promocoes;
            //Device.StartTimer(TimeSpan.FromSeconds(15), () => {
            //    promocoes.Add(new Promocao { Chamada = "simulando observable", NomeEmpresa = "Observador", Regras = "2 unidades", Url = "http://www.carrefour.com.br" });
            //    return true;
            //});
        }
        private void ListaPromocoes()
        {
            promocoes = new ObservableCollection<Promocao>()
            {
                new Promocao {Chamada = "TVs 4K em promoção", NomeEmpresa = "Carrefour", Regras= "2 unidades", Url = "http://www.carrefour.com.br"},
                new Promocao {Chamada = "TVs 4K OLED em promoção", NomeEmpresa = "Extra", Regras= "2 unidades", Url = "http://www.extra.com.br"}
            };
        }
    }


}
