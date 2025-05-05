#include <stdio.h>

int main() {
    int pilihanMenu;
    int hargaSatuan = 0; 
    int jumlahBeli;
    long totalHarga = 0; 
    int pilihanValid = 0; 

    printf("SELAMAT DATANG DI KEDAI KOPI JANJI MANIS\n");
    printf("-------------------------------------\n");
    printf("Menu Tersedia:\n");
    printf("1. Kopi Hitam      (Rp 5000)\n");
    printf("2. Kopi Susu       (Rp 7000)\n");
    printf("3. Teh Manis       (Rp 3000)\n");
    printf("4. Es Jeruk        (Rp 6000)\n");
    printf("Masukkan nomor menu pilihan Anda: ");
    scanf("%d", &pilihanMenu);

    switch (pilihanMenu) {
        case 1:
            hargaSatuan = 5000;
            printf("Anda memilih Kopi Hitam.\n");
            pilihanValid = 1;
            break;
        case 2:
            hargaSatuan = 7000;
            printf("Anda memilih Kopi Susu.\n");
            pilihanValid = 1;
            break;
        case 3:
            hargaSatuan = 3000;
            printf("Anda memilih Teh Manis.\n");
            pilihanValid = 1;
            break;
        case 4:
             hargaSatuan = 6000;
             printf("Anda memilih Es Jeruk.\n");
             pilihanValid = 1;
             break;
        default:
            printf("Maaf, pilihan menu tidak tersedia.\n");
            break;
    }

    if (pilihanValid) {
        printf("Masukkan jumlah yang ingin dibeli: ");
        scanf("%d", &jumlahBeli);

        if (jumlahBeli > 0) {
            totalHarga = (long)hargaSatuan * jumlahBeli; 
            printf("-------------------------------------\n");
            printf("Total yang harus dibayar: Rp %ld\n", totalHarga);
            printf("Terima kasih!\n");
        } else {
            printf("Jumlah beli harus lebih dari 0.\n");
        }
    }

    return 0;
}